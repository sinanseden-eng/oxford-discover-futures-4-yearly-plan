import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigin = Deno.env.get("ALLOWED_ORIGIN") || "*";
const corsHeaders = {
  "Access-Control-Allow-Origin": allowedOrigin,
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" }
  });

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  try {
    const authorization = request.headers.get("Authorization");
    if (!authorization) {
      return jsonResponse({ error: "Teacher sign-in is required." }, 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const publishableKey =
      Deno.env.get("SUPABASE_ANON_KEY") ||
      Deno.env.get("SUPABASE_PUBLISHABLE_KEY");

    if (!supabaseUrl || !publishableKey) {
      return jsonResponse({ error: "Supabase function configuration is incomplete." }, 500);
    }

    const userClient = createClient(supabaseUrl, publishableKey, {
      global: { headers: { Authorization: authorization } },
      auth: { persistSession: false }
    });

    const { data: userData, error: userError } = await userClient.auth.getUser();
    if (userError || !userData.user) {
      return jsonResponse({ error: "The teacher session is invalid or expired." }, 401);
    }

    const { data: approved, error: approvalError } = await userClient.rpc(
      "is_current_user_approved"
    );
    if (approvalError || approved !== true) {
      return jsonResponse({ error: "This email is not approved to edit the plan." }, 403);
    }

    const body = await request.json();
    const plan = body?.plan;
    const prompt = typeof body?.prompt === "string" ? body.prompt.trim() : "";

    if (!Array.isArray(plan) || plan.length === 0) {
      return jsonResponse({ error: "The current plan must contain at least one week." }, 400);
    }
    if (!prompt || prompt.length > 20000) {
      return jsonResponse({ error: "Provide instructions between 1 and 20,000 characters." }, 400);
    }

    const geminiApiKey = Deno.env.get("GEMINI_API_KEY");
    const geminiModel = Deno.env.get("GEMINI_MODEL") || "gemini-3.6-flash";
    if (!geminiApiKey) {
      return jsonResponse({ error: "GEMINI_API_KEY has not been configured." }, 500);
    }

    const systemInstruction = [
      "Act as an expert CEFR B2 ELT curriculum designer.",
      "Update the supplied Oxford Discover Futures 4 yearly plan according to the teacher's request.",
      "Freely add, remove, reorder, merge, split, rename, or rewrite weeks when the teacher requests it.",
      "Return the complete resulting plan as an array containing any positive number of week objects.",
      "Do not enforce a 36-week total. Preserve content that the teacher did not ask to change.",
      "Every object must contain id, week, unit, reading, listening, speaking, writing, grammar, and vocabulary as strings.",
      "Use existing ids for retained weeks and create a unique string id for every newly added week.",
      "Never summarize the plan or return explanatory prose outside the JSON array."
    ].join(" ");

    const responseSchema = {
      type: "ARRAY",
      items: {
        type: "OBJECT",
        properties: {
          id: { type: "STRING" },
          week: { type: "STRING" },
          unit: { type: "STRING" },
          reading: { type: "STRING" },
          listening: { type: "STRING" },
          speaking: { type: "STRING" },
          writing: { type: "STRING" },
          grammar: { type: "STRING" },
          vocabulary: { type: "STRING" }
        },
        required: [
          "id",
          "week",
          "unit",
          "reading",
          "listening",
          "speaking",
          "writing",
          "grammar",
          "vocabulary"
        ]
      }
    };

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(geminiModel)}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": geminiApiKey
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                {
                  text:
                    `Current complete plan (${plan.length} weeks):\n` +
                    JSON.stringify(plan) +
                    "\n\nTeacher request:\n" +
                    prompt
                }
              ]
            }
          ],
          systemInstruction: { parts: [{ text: systemInstruction }] },
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 32768,
            responseMimeType: "application/json",
            responseSchema
          }
        })
      }
    );

    const result = await geminiResponse.json();
    if (!geminiResponse.ok) {
      const message = result?.error?.message || "Gemini request failed.";
      return jsonResponse({ error: message }, 502);
    }

    const responseParts = result?.candidates?.[0]?.content?.parts;
    const rawText = Array.isArray(responseParts)
      ? responseParts.map((part: { text?: string }) => part.text || "").join("")
      : "";
    if (!rawText) {
      return jsonResponse({ error: "Gemini returned an empty response." }, 502);
    }

    const arrangedPlan = JSON.parse(rawText);
    if (!Array.isArray(arrangedPlan) || arrangedPlan.length === 0) {
      return jsonResponse(
        { error: "Gemini did not return a valid non-empty plan. Nothing was changed." },
        422
      );
    }

    return jsonResponse({ plan: arrangedPlan });
  } catch (error) {
    console.error("arrange-plan failed", error);
    return jsonResponse(
      { error: error instanceof Error ? error.message : "Unexpected server error." },
      500
    );
  }
});
