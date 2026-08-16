import React, { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Calendar,
  Download,
  GripVertical,
  Plus,
  Printer,
  Save,
  Sparkles,
  Trash2,
  Edit3,
  X,
  Move,
  Type,
  Wand2,
  Loader2,
  AlertCircle,
  Cloud,
  CloudOff,
  LogIn,
  LogOut,
  Mail,
  UserCheck
} from "lucide-react";
import { isSupabaseConfigured, supabase } from "./lib/supabase.js";

const initialData = [
  // UNIT 1
  {
    id: "1",
    week: "1",
    unit: "Unit 1: How is music a part of our lives?",
    reading: "Reading concepts: Golden Record, space probe, civilization, common language, pattern, predict, outcome.",
    listening: "Listening for Main Ideas: Understanding the overall theme of a broadcast.",
    speaking: "Explaining effects of sound: make someone feel relaxed, help focus, distract, energize, affect mood, encourage behaviour.",
    writing: "Writing a Review: Structuring informal review of a song or concert.",
    grammar: "Describing trends (verbs + adverbs): increased dramatically, rose gradually, fell steadily, declined sharply.",
    vocabulary: "Core music: beat, genre, melody, pitch, playlist, rhythm, soundtrack, tempo, track."
  },
  {
    id: "2",
    week: "2",
    unit: "Unit 1: Literature Focus — 'The Silent Forest'",
    reading: "Literature Focus: 'The Silent Forest' (Ch 9, p. 125); Evaluating artistic vs scientific knowledge; cause-and-effect in ecosystems.",
    listening: "Listening for Tone: Identifying speaker's emotional state in acoustic environments.",
    speaking: "Making recommendations & predicting outcomes: I would recommend, I propose that we, I expect that, It's likely that, I'm convinced that.",
    writing: "Descriptive Language: Expressing emotional responses to auditory stimuli; Adjectives for impact.",
    grammar: "Describing trends (adjective + trend noun): There was a dramatic increase in..., There was a steady decline in...",
    vocabulary: "Sound & Nature: chatter, rustling, harmony, acoustics, traditional skills, distracting, energizing, relaxing, soothing, upbeat, steady beat, fast tempo."
  },
  {
    id: "3",
    week: "3",
    unit: "Unit 1: Soundscape Lab & Review",
    reading: "Understanding Structure: Recognizing topic sentences; Synthesizing literature themes.",
    listening: "Data extraction: Students use music-technology data to identify false alibis.",
    speaking: "Investigating & presenting evidence: We suspect, We accuse, Evidence suggests that, According to data, Statement cannot be true because.",
    writing: "Writing a final security recommendation report.",
    grammar: "Present tenses review; State verbs vs. Action verbs.",
    vocabulary: "Mystery vocab: clue, evidence, suspect, culprit, alibi, contradiction, sabotage, transmission; Idioms: Face the music, Play it by ear, Music to my ears."
  },

  // UNIT 2
  {
    id: "4",
    week: "4",
    unit: "Unit 2: What is the value of money?",
    reading: "Scanning for Details: Locating specific facts, numbers, and dates in economic texts.",
    listening: "Specific Information: Extracting numerical data and statistics from financial audio.",
    speaking: "Problem Solving: Negotiating and discussing financial choices and trade-offs.",
    writing: "Formal Correspondence: Writing a formal email or letter regarding transactions.",
    grammar: "Future forms (will, going to, present continuous).",
    vocabulary: "Money & Trade: barter, bill, checkout counter, consumer, currency, deal, goods, negotiate, swap, transaction."
  },
  {
    id: "5",
    week: "5",
    unit: "Unit 2: Literature Focus — 'Fishing for Stones'",
    reading: "Literature Focus: 'Fishing for Stones' (Ch 6, p. 85); Consumer decision-making, impulse spending, monetary cost vs subjective value.",
    listening: "Note-taking: Jotting down key points during a short lecture on financial choices.",
    speaking: "Decision-Making Role-Play & Debate: Discussing trade-offs, short-term temptation vs long-term goals, financial regret.",
    writing: "Register & Reflective Writing: Analyzing financial regret, creative resourcefulness.",
    grammar: "Future Perfect & Future Continuous.",
    vocabulary: "Compound Adjectives: hard-to-resist, high-tech, must-have, overnight, sky-high, worldwide; Idioms: Break the bank, Tighten your belt, Live from hand to mouth, A nest egg, Cost a fortune, Money doesn't grow on trees, Pinch pennies, In the red, Make ends meet, Cash cow, Save for a rainy day, Pay through the nose, Born with a silver spoon, A penny for your thoughts, Throw money down the drain."
  },
  {
    id: "6",
    week: "6",
    unit: "Unit 2: World Problems & Review",
    reading: "Critical Reading: Analyzing text arguments on ethical trade and global solutions.",
    listening: "Listening for Detail: Understanding complex financial scenarios and charitable ventures.",
    speaking: "Justifying Opinions & Debating: Discussing social enterprises, priority spending, global welfare.",
    writing: "Writing an objective opinion essay on money and happiness.",
    grammar: "Future in the past (was going to, would); Review of future forms.",
    vocabulary: "World Problems: benefit, damage, deserve, potential, poverty, priority, ruin, social enterprise, transform, vaccination."
  },

  // PROJECT 1
  {
    id: "7",
    week: "7",
    unit: "Project 1",
    reading: "Research Skills: Gathering information on costs and logistics.",
    listening: "Collaborative Listening: Listening to peer ideas.",
    speaking: "Presenting: Pitching a collaborative plan to the class.",
    writing: "Project Writing: Drafting a budget and festival proposal.",
    grammar: "Project: Planning a music festival.",
    vocabulary: "Project terminology; Festival logistics."
  },

  // UNIT 3
  {
    id: "8",
    week: "8",
    unit: "Unit 3: Why do we read? — Cognitive Benefits & Conflict Repair",
    reading: "Inferring Meaning & Evaluating Benefits: Analyzing cognitive/psychological impacts of print vs digital reading; Factflix documentary analysis.",
    listening: "Factflix Documentary: Identifying statistics on teenage reading habits and brain stimulation.",
    speaking: "Role-Play & Practical Repair Scene: Classroom setting — Boy returns colourful pencil case to Girl with hand over chest apologetically. Girl proudly shows repaired green pencil joined by pale tape. Montessori Peace Table with wooden talking object nearby. Teacher stands behind with attentive body language, facilitating personal boundaries, responsibility, repair, and renewed cooperation.",
    writing: "Personal Reflection: Expressing preferences, recommendations, memorable book experiences.",
    grammar: "Habits & Preferences: When I get the chance..., The kind of things I enjoy are..., I couldn't put it down because...",
    vocabulary: "Cognitive States: empathy (understanding feelings), escapism (distraction from reality), concentration (focusing attention), complexity (intricate state), stimulation (encouragement to develop), knowledge (acquired facts); Idioms: read between the lines, don't judge a book by its cover, an open book, hit the books, page-turner, read someone like a book, by the book, take a leaf out of someone's book, have your nose in a book."
  },
  {
    id: "9",
    week: "9",
    unit: "Unit 3: Reading to Learn — Visual Storytelling & Graphic Novels",
    reading: "Interpreting Visual Clues: Analyzing Shaun Tan's 'The Arrival'; symbolism (objects/figures for abstract ideas), mood (atmosphere via color/shading), perspective (narrative point of view).",
    listening: "Following Visual Narrative: Comparing prose accounts, manga, and graphic novels.",
    speaking: "Talking Points: Comparing prose fiction vs graphic novels; debating visual literacy vs prose complexity.",
    writing: "Visual Analysis Narrative: Describing settings, character emotions, visual metaphors in sequence.",
    grammar: "Past Habits & Timeframes: used to vs would; get used to / be used to; Past Simple, Continuous, Perfect Simple, Perfect Continuous.",
    vocabulary: "Graphic Novels: symbolism (representation), mood (created atmosphere), perspective (point of view), panel (comic frame), narrative (story account), imagery (descriptive language), layout (page arrangement), text bubble (speech shape), dialogue, motion lines, sound effects, storyline, prose books, manga, metaphor."
  },
  {
    id: "10",
    week: "10",
    unit: "Unit 3: Life Skills, Data Literacy & Essay Workshop",
    reading: "Presenting Data with Infographics: Evaluating pie charts, bar graphs, line charts for clarity, typography impact, and audience engagement.",
    listening: "Listening for Numbers: Auditory accuracy for large numbers (1,213), -teen vs -ty (18 vs 80), decimals (3.65), dates (1920s), fractions (2/3), percentages.",
    speaking: "Analyzing Infographics: Key phrases: Things that I notice are..., I'd say that it emphasizes..., Typography reminds me of..., Layout makes me focus on...",
    writing: "Writing Workshop — For and Against Essay: Presenting counter-arguments neutrally ('People claim that...'); Turning back ('That said...', 'However...'); Reasons/results connectors.",
    grammar: "Reasons & Results connectors: because, since, therefore, as a result, nevertheless.",
    vocabulary: "Infographics & Data: infographic (visual data representation), statistic (numerical fact), pie chart (proportional circle graph), bar graph (rectangular comparison chart), typography (printed text style), data (collected facts/stats), eye-catching, impactful, striking."
  },

  // UNIT 4
  {
    id: "11",
    week: "11",
    unit: "Unit 4: Why do we compete?",
    reading: "Fact vs. Opinion: Distinguishing objective facts from subjective views in sports articles.",
    listening: "Interview Comprehension: Following Q&A formats in sports interviews.",
    speaking: "Comparing & Contrasting: Discussing different sports and competitions.",
    writing: "Opinion Essay: Structuring arguments for and against a topic.",
    grammar: "Modals of ability.",
    vocabulary: "Sports and competition terminology."
  },
  {
    id: "12",
    week: "12",
    unit: "Unit 4: Continuation",
    reading: "Synthesizing: Combining information from two different short texts.",
    listening: "Listening for Emphasis: Recognizing stressed words that carry meaning.",
    speaking: "Role-play: Acting out a post-match interview.",
    writing: "Paragraphing: Writing clear topic and supporting sentences.",
    grammar: "Modals of obligation.",
    vocabulary: "Winning and losing idioms."
  },
  {
    id: "13",
    week: "13",
    unit: "Unit 4: Review",
    reading: "Reading articles about sports psychology.",
    listening: "Understanding sports commentary.",
    speaking: "Debating the ethics of competition.",
    writing: "Writing a persuasive essay on a sports topic.",
    grammar: "Modals of deduction; Review of modals.",
    vocabulary: "Advanced sports and performance vocabulary."
  },

  // PROJECT 2
  {
    id: "14",
    week: "14",
    unit: "Project 2",
    reading: "Script Reading: Analyzing script formats and directions.",
    listening: "Audio Cues: Identifying sound effects and background audio.",
    speaking: "Directing: Giving clear, concise instructions to peers.",
    writing: "Scriptwriting: Writing dialogues and stage directions.",
    grammar: "Project: Making a short movie.",
    vocabulary: "Movie and script terminology."
  },

  // UNIT 5
  {
    id: "15",
    week: "15",
    unit: "Unit 5: How do we remember the past?",
    reading: "Text Coherence: Understanding pronoun references and linking words.",
    listening: "Chronological Order: Following historical timelines in a lecture.",
    speaking: "Recounting Past Events: Sharing personal memories and anecdotes.",
    writing: "Biographical Writing: Writing a short biography of a historical figure.",
    grammar: "Present Perfect Simple.",
    vocabulary: "History and memory vocabulary."
  },
  {
    id: "16",
    week: "16",
    unit: "Unit 5: Continuation",
    reading: "Visualizing: Using text descriptions to form mental images.",
    listening: "Identifying Context: Guessing situation/relationship of speakers.",
    speaking: "Asking Follow-up Questions: Showing active interest in conversation.",
    writing: "Editing: Checking for chronological consistency.",
    grammar: "Present Perfect Continuous.",
    vocabulary: "Phrasal verbs related to time/past."
  },
  {
    id: "17",
    week: "17",
    unit: "Unit 5: Review",
    reading: "Analyzing historical primary sources.",
    listening: "Listening to historical documentaries.",
    speaking: "Discussing the impact of historical events.",
    writing: "Writing a reflective essay on a historical figure.",
    grammar: "Present Perfect Simple vs. Continuous review.",
    vocabulary: "Adjective suffixes; Advanced history vocabulary."
  },

  // MID-YEAR
  {
    id: "18",
    week: "18",
    unit: "Mid-Year Review",
    reading: "Reading Comprehension Practice.",
    listening: "Listening Comprehension Practice.",
    speaking: "Speaking Assessments.",
    writing: "Writing Assessments.",
    grammar: "Review of Units 1-5.",
    vocabulary: "Review of Units 1-5."
  },

  // UNIT 6
  {
    id: "19",
    week: "19",
    unit: "Unit 6: What is special about home?",
    reading: "Reading for Description: Identifying spatial relationships in text.",
    listening: "Understanding Descriptions: Visualizing places described in audio.",
    speaking: "Describing Places: Using spatial prepositions to describe a room/home.",
    writing: "Descriptive Essay: Engaging reader's senses (sight, sound, feel).",
    grammar: "Zero Conditional.",
    vocabulary: "Housing and architecture types."
  },
  {
    id: "20",
    week: "20",
    unit: "Unit 6: Continuation",
    reading: "Identifying Audience: Determining who a text is written for.",
    listening: "Listening for Examples: Recognizing when a speaker provides examples.",
    speaking: "Hypothesizing: Talking about imaginary living situations.",
    writing: "Using Imagery: Upgrading vocabulary for better descriptions.",
    grammar: "First Conditional.",
    vocabulary: "Adjectives for describing places."
  },
  {
    id: "21",
    week: "21",
    unit: "Unit 6: Review",
    reading: "Reading articles on futuristic homes.",
    listening: "Understanding podcasts about living spaces.",
    speaking: "Debating urban vs. rural living.",
    writing: "Writing a real estate listing.",
    grammar: "Second Conditional; Review of conditionals.",
    vocabulary: "Advanced housing and architecture vocabulary."
  },

  // PROJECT 3
  {
    id: "22",
    week: "22",
    unit: "Project 3",
    reading: "Critical Reading: Analyzing arguments for debate prep.",
    listening: "Active Listening: Listening closely to counter-arguments.",
    speaking: "Debating Skills: Formulating arguments and rebuttals on spot.",
    writing: "Speech Writing: Drafting opening statement for a debate.",
    grammar: "Project: Taking part in a balloon debate.",
    vocabulary: "Debate terminology and persuasive language."
  },

  // UNIT 7
  {
    id: "23",
    week: "23",
    unit: "Unit 7: Why do colors matter?",
    reading: "Cause and Effect: Identifying language that shows results.",
    listening: "Inferring Implicit Meaning: Understanding what isn't directly said.",
    speaking: "Presenting with Visuals: Using slides or images to support speaking.",
    writing: "Writing a Report: Summarizing data from charts or visual infographics.",
    grammar: "The Passive Voice (Present/Past).",
    vocabulary: "Colors and psychology terminology."
  },
  {
    id: "24",
    week: "24",
    unit: "Unit 7: Continuation",
    reading: "Understanding Process: Following step-by-step written explanations.",
    listening: "Categorizing: Grouping information heard into categories.",
    speaking: "Describing Impact: Discussing how visual elements affect mood.",
    writing: "Linking Ideas: Using cohesive devices (therefore, as a result).",
    grammar: "The Passive Voice (Future/Perfect).",
    vocabulary: "Color idioms and visual arts."
  },
  {
    id: "25",
    week: "25",
    unit: "Unit 7: Review",
    reading: "Analyzing texts on psychology of branding.",
    listening: "Listening to lectures on art and color theory.",
    speaking: "Critiquing visual designs and marketing campaigns.",
    writing: "Writing an analytical essay on visual impact.",
    grammar: "Causative forms (have/get something done).",
    vocabulary: "Advanced visual arts vocabulary."
  },

  // UNIT 8
  {
    id: "26",
    week: "26",
    unit: "Unit 8: How does water affect our lives?",
    reading: "Summarizing: Reducing long article into key bullet points.",
    listening: "Identifying Arguments: Listening to panel discussion or debate.",
    speaking: "Formal Debate: Expressing strong opinions politely and firmly.",
    writing: "Persuasive Writing: Writing campaign leaflet or persuasive essay.",
    grammar: "Reported Speech (Statements).",
    vocabulary: "Environment and nature terminology."
  },
  {
    id: "27",
    week: "27",
    unit: "Unit 8: Continuation",
    reading: "Cross-referencing: Checking facts across multiple short texts.",
    listening: "Listening for Transitions: Recognizing words that signal topic change.",
    speaking: "Persuading: Convincing partner to adopt eco-friendly habit.",
    writing: "Call to Action: Writing strong concluding paragraphs.",
    grammar: "Reported Questions.",
    vocabulary: "Water-related vocabulary and idioms."
  },
  {
    id: "28",
    week: "28",
    unit: "Unit 8: Review",
    reading: "Reading scientific reports on climate change.",
    listening: "Understanding documentaries on water scarcity.",
    speaking: "Discussing environmental solutions.",
    writing: "Drafting environmental policy proposal.",
    grammar: "Reported Commands; Review of Reported Speech.",
    vocabulary: "Advanced environment and sustainability vocabulary."
  },

  // PROJECT 4
  {
    id: "29",
    week: "29",
    unit: "Project 4",
    reading: "Evaluating Sources: Checking reliability of debate materials.",
    listening: "Evaluating Arguments: Judging strength of peer's point.",
    speaking: "Moderating: Leading group discussion or debate.",
    writing: "Debate Notes: Organizing notes into clear pros and cons.",
    grammar: "Project: Conducting a class debate.",
    vocabulary: "Moderation and formal debate terminology."
  },

  // UNIT 9
  {
    id: "30",
    week: "30",
    unit: "Unit 9: Is speed important?",
    reading: "Skimming/Scanning under time: Improving reading speed and fluency.",
    listening: "Signpost Language: Recognizing phrases that guide a lecture.",
    speaking: "Speculating: Discussing future pace of technology and life.",
    writing: "For and Against Essay: Balancing arguments on both sides.",
    grammar: "Relative Clauses (Defining).",
    vocabulary: "Technology and transport vocabulary."
  },
  {
    id: "31",
    week: "31",
    unit: "Unit 9: Continuation",
    reading: "Recognizing Bias: Identifying author's leaning in article.",
    listening: "Listening for Conclusions: Understanding final point or summary.",
    speaking: "Evaluating: Discussing pros and cons of modern lifestyles.",
    writing: "Concluding: Writing balanced conclusions.",
    grammar: "Relative Clauses (Non-defining).",
    vocabulary: "Adverbs of degree."
  },
  {
    id: "32",
    week: "32",
    unit: "Unit 9: Review",
    reading: "Analyzing opinion pieces on modern pacing.",
    listening: "Listening to debates on technology speed.",
    speaking: "Presenting arguments on impact of speed.",
    writing: "Writing an editorial on modern lifestyles.",
    grammar: "Articles and Quantifiers review.",
    vocabulary: "Advanced technology and lifestyle vocabulary."
  },

  // UNIT 10
  {
    id: "33",
    week: "33",
    unit: "Unit 10: Why do we need art?",
    reading: "Synthesizing Sources: Combining information from reviews and articles.",
    listening: "Appreciating Critiques: Listening to art reviews and critical opinions.",
    speaking: "Critiquing: Describing artwork and expressing abstract concepts.",
    writing: "Exhibition Review: Writing evaluation of event or artwork.",
    grammar: "Past Modals of Deduction.",
    vocabulary: "Art, expression, and creativity."
  },
  {
    id: "34",
    week: "34",
    unit: "Unit 10: Continuation",
    reading: "Understanding Metaphor: Grasping figurative language in texts.",
    listening: "Listening for Agreement: Recognizing when speakers share opinion.",
    speaking: "Expressing Emotion: Talking about how art makes one feel.",
    writing: "Advanced Vocabulary: Incorporating sophisticated adjectives.",
    grammar: "Gerunds.",
    vocabulary: "Phrasal verbs with multiple meanings."
  },
  {
    id: "35",
    week: "35",
    unit: "Unit 10: Review",
    reading: "Reading in-depth art history articles.",
    listening: "Understanding abstract art critiques.",
    speaking: "Debating definition and value of art.",
    writing: "Writing comprehensive art critique.",
    grammar: "Infinitives; Review of gerunds and infinitives.",
    vocabulary: "Advanced art and aesthetics vocabulary."
  },

  // END OF YEAR
  {
    id: "36",
    week: "36",
    unit: "End of Year Review / Exams",
    reading: "Final Reading Assessment.",
    listening: "Final Listening Assessment.",
    speaking: "Final Speaking Assessment.",
    writing: "Final Writing Assessment.",
    grammar: "Wrap-up and Reflection.",
    vocabulary: "Wrap-up and Reflection."
  }
];

const skillStyles = {
  unit: {
    label: "Unit / Focus",
    icon: "📌",
    card: "bg-gradient-to-br from-slate-50 to-orange-50/50 border-orange-200 text-slate-900 focus:border-orange-400 focus:ring-orange-200",
    badge: "bg-orange-100 text-orange-800 border-orange-200",
    tagBg: "bg-orange-100/90 text-orange-900 border-orange-200 hover:bg-orange-200"
  },
  reading: {
    label: "Reading",
    icon: "📖",
    card: "bg-rose-50/80 border-rose-200 text-rose-950 focus:border-rose-400 focus:ring-rose-200",
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    tagBg: "bg-rose-100 text-rose-900 border-rose-200 hover:bg-rose-200"
  },
  listening: {
    label: "Listening",
    icon: "🎧",
    card: "bg-amber-50/80 border-amber-200 text-amber-950 focus:border-amber-400 focus:ring-amber-200",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    tagBg: "bg-amber-100 text-amber-900 border-amber-200 hover:bg-amber-200"
  },
  speaking: {
    label: "Speaking",
    icon: "💬",
    card: "bg-emerald-50/80 border-emerald-200 text-emerald-950 focus:border-emerald-400 focus:ring-emerald-200",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    tagBg: "bg-emerald-100 text-emerald-900 border-emerald-200 hover:bg-emerald-200"
  },
  writing: {
    label: "Writing",
    icon: "✍️",
    card: "bg-sky-50/80 border-sky-200 text-sky-950 focus:border-sky-400 focus:ring-sky-200",
    badge: "bg-sky-100 text-sky-700 border-sky-200",
    tagBg: "bg-sky-100 text-sky-900 border-sky-200 hover:bg-sky-200"
  },
  grammar: {
    label: "Grammar",
    icon: "📝",
    card: "bg-violet-50/80 border-violet-200 text-violet-950 focus:border-violet-400 focus:ring-violet-200",
    badge: "bg-violet-100 text-violet-700 border-violet-200",
    tagBg: "bg-violet-100 text-violet-900 border-violet-200 hover:bg-violet-200"
  },
  vocabulary: {
    label: "Vocabulary",
    icon: "📚",
    card: "bg-fuchsia-50/80 border-fuchsia-200 text-fuchsia-950 focus:border-fuchsia-400 focus:ring-fuchsia-200",
    badge: "bg-fuchsia-100 text-fuchsia-700 border-fuchsia-200",
    tagBg: "bg-fuchsia-100 text-fuchsia-900 border-fuchsia-200 hover:bg-fuchsia-200"
  }
};

const STORAGE_KEY = "oxford-discover-futures-4-collaborative-v1";
const PLAN_ID = "odf4-yearly-plan";
const AUTOSAVE_DELAY_MS = 900;

const toDatabaseRow = (item, index, userId = null) => ({
  plan_id: PLAN_ID,
  id: String(item.id),
  week: String(item.week),
  sort_order: index + 1,
  unit: item.unit || "",
  reading: item.reading || "",
  listening: item.listening || "",
  speaking: item.speaking || "",
  writing: item.writing || "",
  grammar: item.grammar || "",
  vocabulary: item.vocabulary || "",
  updated_by: userId
});

const fromDatabaseRow = (row) => ({
  id: String(row.id),
  week: String(row.week),
  unit: row.unit || "",
  reading: row.reading || "",
  listening: row.listening || "",
  speaking: row.speaking || "",
  writing: row.writing || "",
  grammar: row.grammar || "",
  vocabulary: row.vocabulary || "",
  _sortOrder: Number(row.sort_order) || Number(row.week) || 0
});

function parseItems(textStr) {
  if (!textStr || typeof textStr !== "string") return [];
  return textStr
    .split(/;|\n/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function stringifyItems(itemsArr) {
  return itemsArr.join("; ");
}

export default function App() {
  const [plan, setPlan] = useState(initialData);
  const [saveStatus, setSaveStatus] = useState("Loading shared plan...");
  const [viewMode, setViewMode] = useState("chips"); // 'chips' or 'text'
  const [editingItem, setEditingItem] = useState(null); // chip editor

  // AI & Modal States
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  // Shared backend & approved teacher authentication
  const [session, setSession] = useState(null);
  const [isApprovedEditor, setIsApprovedEditor] = useState(false);
  const [authEmail, setAuthEmail] = useState("");
  const [authMessage, setAuthMessage] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [remoteReady, setRemoteReady] = useState(!isSupabaseConfigured);
  const [remoteHasData, setRemoteHasData] = useState(false);

  const canEdit = Boolean(session && isApprovedEditor);

  // Drag references
  const dragRowItem = useRef(null);
  const dragRowOverItem = useRef(null);
  const draggedChipRef = useRef(null);
  const planRef = useRef(initialData);
  const dirtyIdsRef = useRef(new Set());
  const deletedIdsRef = useRef(new Set());
  const autosaveTimerRef = useRef(null);
  const savingRef = useRef(false);
  const canEditRef = useRef(false);
  const remoteReadyRef = useRef(!isSupabaseConfigured);

  canEditRef.current = canEdit;
  remoteReadyRef.current = remoteReady;

  const updatePlanState = (nextPlan) => {
    planRef.current = nextPlan;
    setPlan(nextPlan);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPlan));
  };

  const flushPendingChanges = async () => {
    clearTimeout(autosaveTimerRef.current);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planRef.current));

    if (!isSupabaseConfigured || !supabase || !canEditRef.current || !remoteReadyRef.current) {
      setSaveStatus(isSupabaseConfigured ? "View only" : "Saved locally");
      return;
    }

    if (savingRef.current) {
      autosaveTimerRef.current = setTimeout(() => {
        void flushPendingChanges();
      }, AUTOSAVE_DELAY_MS);
      return;
    }

    const dirtyIds = [...dirtyIdsRef.current];
    const deletedIds = [...deletedIdsRef.current];
    if (dirtyIds.length === 0 && deletedIds.length === 0) {
      setSaveStatus("Saved automatically");
      return;
    }

    dirtyIdsRef.current.clear();
    deletedIdsRef.current.clear();
    savingRef.current = true;
    setSaveStatus("Saving...");

    try {
      if (deletedIds.length > 0) {
        const { error: deleteError } = await supabase
          .from("plan_weeks")
          .delete()
          .eq("plan_id", PLAN_ID)
          .in("id", deletedIds);

        if (deleteError) throw deleteError;
      }

      const latestPlan = planRef.current;
      const rows = latestPlan
        .map((item, index) => ({ item, index }))
        .filter(({ item }) => dirtyIds.includes(String(item.id)))
        .map(({ item, index }) =>
          toDatabaseRow(item, index, session?.user?.id || null)
        );

      if (rows.length > 0) {
        const { error: upsertError } = await supabase
          .from("plan_weeks")
          .upsert(rows, { onConflict: "plan_id,id" });

        if (upsertError) throw upsertError;
      }

      setRemoteHasData(true);
      setSaveStatus("Saved automatically");
    } catch (error) {
      dirtyIds.forEach((id) => dirtyIdsRef.current.add(id));
      deletedIds.forEach((id) => deletedIdsRef.current.add(id));
      console.error("Automatic save failed:", error);
      setSaveStatus("Save failed — retrying");
    } finally {
      savingRef.current = false;
      if (dirtyIdsRef.current.size > 0 || deletedIdsRef.current.size > 0) {
        autosaveTimerRef.current = setTimeout(() => {
          void flushPendingChanges();
        }, AUTOSAVE_DELAY_MS);
      }
    }
  };

  const markDirty = (ids) => {
    ids.forEach((id) => {
      dirtyIdsRef.current.add(String(id));
      deletedIdsRef.current.delete(String(id));
    });
    setSaveStatus("Saving soon...");
    clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      void flushPendingChanges();
    }, AUTOSAVE_DELAY_MS);
  };

  const applyPlanChange = (nextPlan, changedIds) => {
    updatePlanState(nextPlan);
    markDirty(changedIds);
  };

  const refreshEditorAccess = async (nextSession) => {
    setSession(nextSession || null);
    if (!nextSession || !supabase) {
      setIsApprovedEditor(false);
      return;
    }

    const { data, error } = await supabase.rpc("is_current_user_approved");
    if (error) {
      console.error("Editor access check failed:", error);
      setIsApprovedEditor(false);
      setAuthMessage("Signed in, but editor permission could not be verified.");
      return;
    }

    const approved = data === true;
    setIsApprovedEditor(approved);
    setAuthMessage(
      approved
        ? "Approved teacher access enabled."
        : "This account is signed in but is not on the approved-teachers list."
    );
  };

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          planRef.current = parsed;
          setPlan(parsed);
        }
      } catch (error) {
        console.error("Stored backup failed to load:", error);
      }
    }

    if (!isSupabaseConfigured) {
      setSaveStatus("Local mode — connect Supabase to share");
    }
  }, []);

  useEffect(() => {
    if (!isSupabaseConfigured || !supabase) return undefined;

    let active = true;

    const loadSharedPlan = async () => {
      const { data, error } = await supabase
        .from("plan_weeks")
        .select("*")
        .eq("plan_id", PLAN_ID)
        .order("sort_order", { ascending: true });

      if (!active) return;

      if (error) {
        console.error("Shared plan failed to load:", error);
        setSaveStatus("Cloud unavailable — showing local backup");
        setRemoteReady(true);
        return;
      }

      if (data && data.length > 0) {
        const sharedPlan = data.map(fromDatabaseRow);
        updatePlanState(sharedPlan);
        setRemoteHasData(true);
        setSaveStatus("Shared plan loaded");
      } else {
        setRemoteHasData(false);
        setSaveStatus("Shared plan ready for first approved editor");
      }
      setRemoteReady(true);
    };

    void supabase.auth.getSession().then(({ data }) => {
      if (active) void refreshEditorAccess(data.session);
    });
    void loadSharedPlan();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, nextSession) => {
        if (!active) return;
        setSession(nextSession);
        window.setTimeout(() => {
          if (active) void refreshEditorAccess(nextSession);
        }, 0);
      }
    );

    const channel = supabase
      .channel("shared-plan-" + PLAN_ID)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "plan_weeks",
          filter: "plan_id=eq." + PLAN_ID
        },
        (payload) => {
          const changedId = String(payload.new?.id || payload.old?.id || "");
          if (!changedId || dirtyIdsRef.current.has(changedId)) return;

          if (payload.eventType === "DELETE") {
            const nextPlan = planRef.current.filter(
              (item) => String(item.id) !== changedId
            );
            updatePlanState(nextPlan);
            return;
          }

          const incoming = fromDatabaseRow(payload.new);
          const current = [...planRef.current];
          const existingIndex = current.findIndex(
            (item) => String(item.id) === changedId
          );

          if (existingIndex >= 0) current[existingIndex] = incoming;
          else current.push(incoming);

          current.sort(
            (a, b) =>
              (a._sortOrder || Number(a.week) || 0) -
              (b._sortOrder || Number(b.week) || 0)
          );
          updatePlanState(current);
        }
      )
      .subscribe();

    return () => {
      active = false;
      authListener.subscription.unsubscribe();
      void supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (
      !isSupabaseConfigured ||
      !supabase ||
      !canEdit ||
      !remoteReady ||
      remoteHasData
    ) {
      return;
    }

    const seedSharedPlan = async () => {
      setSaveStatus("Creating shared 36-week plan...");
      const sourcePlan =
        planRef.current.length >= 36 ? planRef.current : initialData;
      const rows = sourcePlan.map((item, index) =>
        toDatabaseRow(item, index, session?.user?.id || null)
      );
      const { error } = await supabase
        .from("plan_weeks")
        .upsert(rows, { onConflict: "plan_id,id" });

      if (error) {
        console.error("Initial shared plan creation failed:", error);
        setSaveStatus("Could not create shared plan");
        return;
      }

      setRemoteHasData(true);
      setSaveStatus("Shared plan created and saved");
    };

    void seedSharedPlan();
  }, [canEdit, remoteHasData, remoteReady, session]);

  useEffect(
    () => () => {
      clearTimeout(autosaveTimerRef.current);
    },
    []
  );

  const requestLoginLink = async (event) => {
    event.preventDefault();
    if (!supabase || !authEmail.trim()) return;

    setAuthLoading(true);
    setAuthMessage("");
    const { error } = await supabase.auth.signInWithOtp({
      email: authEmail.trim().toLowerCase(),
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin
      }
    });

    setAuthLoading(false);
    setAuthMessage(
      error
        ? error.message
        : "If this address was invited, a secure sign-in link has been sent."
    );
  };

  const signOut = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
    setIsApprovedEditor(false);
    setAuthMessage("Signed out. The shared plan remains available to view.");
  };

  const savePlan = async () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(planRef.current));
    if (canEditRef.current) {
      markDirty(planRef.current.map((item) => item.id));
      await flushPendingChanges();
    } else {
      setSaveStatus(isSupabaseConfigured ? "View only" : "Saved locally");
    }
  };

  const handleArrangeWithGemini = async () => {
    if (!canEdit) {
      setAiError("Approved teacher access is required.");
      return;
    }
    if (!aiPrompt.trim()) {
      setAiError("Please type instructions or paste raw text for Gemini to arrange.");
      return;
    }
    if (!supabase) {
      setAiError("Connect Supabase before using secure AI arrangement.");
      return;
    }

    setAiLoading(true);
    setAiError("");

    try {
      const { data, error } = await supabase.functions.invoke("arrange-plan", {
        body: {
          plan: planRef.current,
          prompt: aiPrompt.trim()
        }
      });

     if (error) {
  let detailedMessage = error.message;

  try {
    const errorBody = await error.context?.json();

    detailedMessage =
      errorBody?.error ||
      errorBody?.message ||
      detailedMessage;
  } catch {
    // Keep the original message if the response cannot be read.
  }

  throw new Error(detailedMessage);
}

      const parsedPlan = data?.plan;
      if (!Array.isArray(parsedPlan) || parsedPlan.length === 0) {
        throw new Error("Gemini must return at least one valid week; no changes were saved.");
      }

      const usedIds = new Set();
      const makeUniqueId = (index) => {
        let id;
        do {
          id = globalThis.crypto?.randomUUID
            ? `ai-${globalThis.crypto.randomUUID()}`
            : `ai-${Date.now()}-${index}-${Math.random().toString(36).slice(2)}`;
        } while (usedIds.has(id));
        return id;
      };

      const formatted = parsedPlan.map((item, index) => {
        const requestedId = String(item?.id ?? "").trim();
        const positionalId = String(planRef.current[index]?.id ?? "").trim();
        const id = requestedId && !usedIds.has(requestedId)
          ? requestedId
          : positionalId && !usedIds.has(positionalId)
            ? positionalId
            : makeUniqueId(index);

        usedIds.add(id);
        return {
          id,
          week: String(item?.week ?? index + 1),
          unit: String(item?.unit ?? ""),
          reading: String(item?.reading ?? ""),
          listening: String(item?.listening ?? ""),
          speaking: String(item?.speaking ?? ""),
          writing: String(item?.writing ?? ""),
          grammar: String(item?.grammar ?? ""),
          vocabulary: String(item?.vocabulary ?? ""),
          _sortOrder: index + 1
        };
      });

      const nextIds = new Set(formatted.map((item) => String(item.id)));
      planRef.current.forEach((item) => {
        const id = String(item.id);
        if (!nextIds.has(id)) {
          deletedIdsRef.current.add(id);
          dirtyIdsRef.current.delete(id);
        }
      });

      applyPlanChange(
        formatted,
        formatted.map((item) => item.id)
      );
      setAiModalOpen(false);
      setAiPrompt("");
      setSaveStatus("AI update queued for automatic save");
    } catch (error) {
      console.error("AI generation failed:", error);
      setAiError(error.message || "Failed to process the plan with Gemini.");
    } finally {
      setAiLoading(false);
    }
  };
  const exportPlan = () => {
    const headers = [
      "Week",
      "Unit & Focus",
      "Reading",
      "Listening",
      "Speaking",
      "Writing",
      "Grammar",
      "Vocabulary"
    ];
    const rows = plan.map((item) => [
      item.week,
      item.unit,
      item.reading,
      item.listening,
      item.speaking,
      item.writing,
      item.grammar,
      item.vocabulary
    ]);
    const csv = [headers, ...rows]
      .map((row) =>
        row.map((val) => `"${String(val).replaceAll('"', '""')}"`).join(",")
      )
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "Oxford_Discover_Futures_4_Lesson_Plan.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const printPlan = () => window.print();

  const dragRowStart = (event, position) => {
    if (!canEdit) return;
    dragRowItem.current = position;
    const target = event.currentTarget;
    setTimeout(() => {
      if (target) target.style.opacity = "0.4";
    }, 0);
  };

  const dragRowEnter = (event, position) => {
    dragRowOverItem.current = position;
    event.preventDefault();
  };

  const dragRowEnd = (event) => {
    if (!canEdit) return;
    if (event.currentTarget) event.currentTarget.style.opacity = "1";
    if (
      dragRowItem.current !== null &&
      dragRowOverItem.current !== null &&
      dragRowItem.current !== dragRowOverItem.current
    ) {
      const updated = [...plan];
      const dragged = updated[dragRowItem.current];
      updated.splice(dragRowItem.current, 1);
      updated.splice(dragRowOverItem.current, 0, dragged);
      const reordered = updated.map((item, index) => ({
        ...item,
        _sortOrder: index + 1
      }));
      applyPlanChange(
        reordered,
        reordered.map((item) => item.id)
      );
    }
    dragRowItem.current = null;
    dragRowOverItem.current = null;
  };

  const handleChipDragStart = (e, weekIndex, field, itemIndex, itemText) => {
    if (!canEdit) return;
    e.stopPropagation();
    draggedChipRef.current = { weekIndex, field, itemIndex, itemText };
    e.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ weekIndex, field, itemIndex, itemText })
    );
    e.currentTarget.style.opacity = "0.5";
  };

  const handleChipDragEnd = (e) => {
    e.currentTarget.style.opacity = "1";
    draggedChipRef.current = null;
  };

  const handleCellDrop = (e, targetWeekIndex, targetField) => {
    if (!canEdit) return;
    e.preventDefault();
    e.stopPropagation();

    let dragData = draggedChipRef.current;
    if (!dragData) {
      try {
        const raw = e.dataTransfer.getData("text/plain");
        if (raw) dragData = JSON.parse(raw);
      } catch (err) {
        return;
      }
    }

    if (!dragData) return;

    const { weekIndex: srcWeek, field: srcField, itemIndex: srcIndex, itemText } = dragData;
    if (srcWeek === targetWeekIndex && srcField === targetField) return;

    const updated = [...plan];
    const srcItems = parseItems(updated[srcWeek][srcField]);
    srcItems.splice(srcIndex, 1);
    updated[srcWeek][srcField] = stringifyItems(srcItems);

    const targetItems = parseItems(updated[targetWeekIndex][targetField]);
    targetItems.push(itemText);
    updated[targetWeekIndex][targetField] = stringifyItems(targetItems);

    applyPlanChange(updated, [updated[srcWeek].id, updated[targetWeekIndex].id]);
    draggedChipRef.current = null;
  };

  const updateItemRaw = (index, field, value) => {
    if (!canEdit) return;
    const updated = [...plan];
    updated[index] = { ...updated[index], [field]: value };
    applyPlanChange(updated, [updated[index].id]);
  };

  const deleteChip = (weekIndex, field, chipIndex) => {
    if (!canEdit) return;
    const updated = [...plan];
    const items = parseItems(updated[weekIndex][field]);
    items.splice(chipIndex, 1);
    updated[weekIndex][field] = stringifyItems(items);
    applyPlanChange(updated, [updated[weekIndex].id]);
  };

  const addNewChip = (weekIndex, field) => {
    if (!canEdit) return;
    const newTopic = prompt("Enter new word, skill, or topic:");
    if (!newTopic || !newTopic.trim()) return;
    const updated = [...plan];
    const items = parseItems(updated[weekIndex][field]);
    items.push(newTopic.trim());
    updated[weekIndex][field] = stringifyItems(items);
    applyPlanChange(updated, [updated[weekIndex].id]);
  };

  const startEditingChip = (weekIndex, field, itemIndex, currentText) => {
    if (!canEdit) return;
    setEditingItem({ weekIndex, field, itemIndex, text: currentText });
  };

  const saveChipEdit = () => {
    if (!canEdit || !editingItem) return;
    const { weekIndex, field, itemIndex, text } = editingItem;
    const updated = [...plan];
    const items = parseItems(updated[weekIndex][field]);
    if (text.trim()) {
      items[itemIndex] = text.trim();
    } else {
      items.splice(itemIndex, 1);
    }
    updated[weekIndex][field] = stringifyItems(items);
    applyPlanChange(updated, [updated[weekIndex].id]);
    setEditingItem(null);
  };

  const addRow = () => {
    if (!canEdit) return;
    const newRow = {
      id: Date.now().toString(),
      week: (plan.length + 1).toString(),
      unit: "New Topic / Unit",
      reading: "",
      listening: "",
      speaking: "",
      writing: "",
      grammar: "",
      vocabulary: "",
      _sortOrder: plan.length + 1
    };
    applyPlanChange([...plan, newRow], [newRow.id]);
  };

  const removeRow = (id) => {
    if (!canEdit) return;
    const stringId = String(id);
    deletedIdsRef.current.add(stringId);
    dirtyIdsRef.current.delete(stringId);
    const nextPlan = plan
      .filter((item) => String(item.id) !== stringId)
      .map((item, index) => ({ ...item, _sortOrder: index + 1 }));
    updatePlanState(nextPlan);
    markDirty(nextPlan.map((item) => item.id));
    deletedIdsRef.current.add(stringId);
    setConfirmDeleteId(null);
  };

  const getSemesterLabel = (index) =>
    index === 0 ? "Semester 1" : index === 18 ? "Semester 2" : null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#ffe4e6_0,#fff7ed_35%,#f8fafc_75%)] text-slate-900 font-sans p-3 md:p-8 print:bg-white print:p-0">
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-card { box-shadow: none !important; border: 1px solid #cbd5e1 !important; break-inside: avoid; }
          .print-grid { display: grid !important; grid-template-columns: 50px 1.4fr 1fr 1fr 1fr 1fr 1fr 1fr !important; gap: 6px !important; }
          textarea, input { border: 0 !important; background: white !important; box-shadow: none !important; resize: none !important; }
        }
      `}</style>

      {/* HEADER BANNER */}
      <div className="max-w-[1600px] mx-auto mb-6 print:mb-4">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 p-6 md:p-8 shadow-2xl shadow-orange-200/60 print:shadow-none print:rounded-xl">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/15 pointer-events-none"></div>
          <div className="absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-white/15 pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-start gap-4">
              <div className="rounded-3xl bg-white/20 p-4 text-white shadow-lg backdrop-blur shrink-0">
                <BookOpen size={40} strokeWidth={2.2} />
              </div>
              <div className="text-white">
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-2xl md:text-4xl font-black tracking-tight">
                    Oxford Discover Futures 4
                  </h1>
                  <Sparkles className="animate-pulse" size={24} />
                </div>
                <p className="mt-1 text-base md:text-lg font-semibold text-white/90">
                  Interactive AI-Powered Lesson Plan & Curriculum Studio
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    CEFR B2
                  </span>
                  <span className="rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    {plan.length} Scheduled Weeks
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/30 bg-white/20 px-3 py-1 text-xs font-bold backdrop-blur">
                    {isSupabaseConfigured ? <Cloud size={13} /> : <CloudOff size={13} />}
                    {saveStatus}
                  </span>
                </div>
              </div>
            </div>

            {/* AUTHENTICATION & ACTION BUTTONS */}
            <div className="no-print flex max-w-3xl flex-wrap items-center justify-end gap-2.5">
              {!isSupabaseConfigured ? (
                <div className="flex items-center gap-2 rounded-2xl border border-white/30 bg-slate-900/25 px-3 py-2 text-xs font-bold text-white backdrop-blur">
                  <CloudOff size={16} />
                  Backend setup required
                </div>
              ) : session ? (
                <div className="rounded-2xl border border-white/35 bg-white/20 px-3 py-2 text-white shadow backdrop-blur">
                  <div className="flex items-center gap-2 text-xs font-black">
                    <UserCheck size={16} />
                    <span className="max-w-[210px] truncate">
                      {session.user.email}
                    </span>
                    <span
                      className={
                        canEdit
                          ? "rounded-full bg-emerald-400/30 px-2 py-0.5 text-emerald-50"
                          : "rounded-full bg-slate-900/25 px-2 py-0.5 text-white/80"
                      }
                    >
                      {canEdit ? "Approved editor" : "View only"}
                    </span>
                    <button
                      type="button"
                      onClick={signOut}
                      className="rounded-lg p-1 hover:bg-white/20"
                      title="Sign out"
                    >
                      <LogOut size={15} />
                    </button>
                  </div>
                  {authMessage && (
                    <p className="mt-1 max-w-sm text-[10px] font-semibold text-white/80">
                      {authMessage}
                    </p>
                  )}
                </div>
              ) : (
                <form
                  onSubmit={requestLoginLink}
                  className="flex flex-wrap items-center gap-2 rounded-2xl border border-white/35 bg-white/20 p-2 shadow backdrop-blur"
                >
                  <label className="sr-only" htmlFor="teacher-email">
                    Approved teacher email
                  </label>
                  <div className="relative">
                    <Mail
                      size={15}
                      className="pointer-events-none absolute left-2.5 top-2.5 text-orange-500"
                    />
                    <input
                      id="teacher-email"
                      type="email"
                      value={authEmail}
                      onChange={(event) => setAuthEmail(event.target.value)}
                      placeholder="Approved teacher email"
                      required
                      className="w-56 rounded-xl border-0 bg-white py-2 pl-8 pr-3 text-xs font-semibold text-slate-800 outline-none ring-orange-200 focus:ring-4"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={authLoading}
                    className="inline-flex items-center gap-1.5 rounded-xl bg-slate-900 px-3 py-2 text-xs font-black text-white hover:bg-slate-800 disabled:opacity-50"
                  >
                    {authLoading ? (
                      <Loader2 size={15} className="animate-spin" />
                    ) : (
                      <LogIn size={15} />
                    )}
                    Email sign-in
                  </button>
                  {authMessage && (
                    <p className="w-full px-1 text-[10px] font-semibold text-white">
                      {authMessage}
                    </p>
                  )}
                </form>
              )}

              {canEdit && (
                <>
                  <button
                    onClick={() => setAiModalOpen(true)}
                    className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-200 to-yellow-300 px-4 py-2.5 font-black text-amber-950 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                  >
                    <Wand2 size={18} className="text-amber-800" />
                    AI Arrange
                  </button>
                  <button
                    onClick={addRow}
                    className="inline-flex items-center gap-2 rounded-2xl bg-white px-4 py-2.5 font-bold text-orange-600 shadow transition hover:-translate-y-0.5 hover:bg-orange-50"
                  >
                    <Plus size={18} strokeWidth={2.6} /> Add Week
                  </button>
                  <button
                    onClick={savePlan}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 px-3.5 py-2.5 font-bold text-white shadow backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30"
                  >
                    <Save size={18} /> Save now
                  </button>
                </>
              )}

              <button
                onClick={() =>
                  setViewMode(viewMode === "chips" ? "text" : "chips")
                }
                className="inline-flex items-center gap-2 rounded-2xl border border-white/40 bg-white/20 px-3.5 py-2.5 font-bold text-white shadow backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30"
                title="Toggle View Mode"
              >
                {viewMode === "chips" ? <Type size={18} /> : <Move size={18} />}
                {viewMode === "chips" ? "Text Mode" : "Card Mode"}
              </button>
              <button
                onClick={exportPlan}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 px-3.5 py-2.5 font-bold text-white shadow backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30"
              >
                <Download size={18} /> CSV
              </button>
              <button
                onClick={printPlan}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/30 bg-white/20 px-3.5 py-2.5 font-bold text-white shadow backdrop-blur transition hover:-translate-y-0.5 hover:bg-white/30"
              >
                <Printer size={18} /> Print
              </button>
            </div>
          </div>
        </div>

        {/* SKILL CATEGORY BADGES */}
        <div className="no-print mt-4 grid gap-2 grid-cols-2 sm:grid-cols-3 xl:grid-cols-7">
          {Object.entries(skillStyles).map(([key, style]) => (
            <div
              key={key}
              className={`rounded-2xl border-2 ${style.badge} p-3 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md flex items-center gap-2`}
            >
              <span className="text-xl">{style.icon}</span>
              <span className="text-xs font-black uppercase tracking-wide truncate">
                {style.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* GEMINI AI MODAL */}
      {aiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm no-print">
          <div className="w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-slate-200 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-4">
              <div className="flex items-center gap-2.5">
                <div className="rounded-2xl bg-amber-100 p-2.5 text-amber-700">
                  <Wand2 size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">
                    Gemini AI Syllabus Arranger
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Type instructions or paste raw textbook syllabus notes to automatically arrange your plan.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setAiModalOpen(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              >
                <X size={20} />
              </button>
            </div>

            {aiError && (
              <div className="mb-4 flex items-start gap-2.5 rounded-2xl bg-red-50 p-3.5 text-xs font-semibold text-red-700 border border-red-200">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{aiError}</span>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-xs font-black uppercase tracking-wide text-slate-600 mb-1.5">
                Your Instructions or Raw Text:
              </label>
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="Example: 'Reorder Units 1 to 3 to focus more on visual literacy and oral storytelling, and add a 2-week revision block before mid-terms...'"
                className="w-full min-h-[140px] rounded-2xl border-2 border-slate-200 p-3.5 text-sm font-medium outline-none focus:border-amber-500 focus:ring-4 focus:ring-amber-100"
                disabled={aiLoading}
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100 pt-4">
              <div className="text-[11px] text-slate-400 font-medium">
                Gemini can freely add, remove, reorder, merge, split, or rewrite weeks.
              </div>
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setAiModalOpen(false)}
                  className="w-full sm:w-auto rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-100"
                  disabled={aiLoading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleArrangeWithGemini}
                  disabled={aiLoading}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-2.5 text-sm font-bold text-white shadow hover:from-amber-600 hover:to-orange-600 disabled:opacity-50"
                >
                  {aiLoading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Arranging...
                    </>
                  ) : (
                    <>
                      <Wand2 size={18} /> Generate Plan
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CONFIRM DELETE MODAL */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm no-print">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl border border-slate-200 text-center">
            <Trash2 size={36} className="text-red-500 mx-auto mb-2" />
            <h3 className="text-base font-black text-slate-900 mb-1">
              Delete Week Row?
            </h3>
            <p className="text-xs text-slate-500 mb-5">
              Are you sure you want to remove this week from your schedule?
            </p>
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={() => removeRow(confirmDeleteId)}
                className="rounded-xl bg-red-500 px-5 py-2 text-xs font-bold text-white shadow hover:bg-red-600"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CHIP MODAL */}
      {editingItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm no-print">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl border border-slate-200">
            <h3 className="text-lg font-black text-slate-800 mb-3 flex items-center gap-2">
              <Edit3 size={18} className="text-orange-500" /> Edit Keyword / Concept
            </h3>
            <textarea
              value={editingItem.text}
              onChange={(e) =>
                setEditingItem({ ...editingItem, text: e.target.value })
              }
              className="w-full rounded-2xl border-2 border-orange-200 p-3 text-sm font-semibold outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100 min-h-[100px]"
              autoFocus
            />
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingItem(null)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={saveChipEdit}
                className="rounded-xl bg-orange-500 px-5 py-2 text-sm font-bold text-white shadow hover:bg-orange-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PLAN GRID TABLE */}
      <div className="max-w-[1600px] mx-auto">
        {!canEdit && (
          <div className="no-print mb-3 flex items-center gap-2 rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3 text-xs font-bold text-sky-800">
            <UserCheck size={17} />
            {session
              ? "This signed-in account has read-only access. The owner must add its email to the approved-teachers list before it can edit."
              : "Public read-only view. Sign in above with an approved teacher email to edit and autosave."}
          </div>
        )}
        <div className="hidden xl:grid grid-cols-[50px_70px_1.3fr_1fr_1fr_1fr_1fr_1fr_1fr_50px] gap-3 rounded-t-3xl bg-slate-800 px-5 py-3 text-xs font-black text-white shadow-xl print:hidden">
          <div className="flex justify-center items-center">
            <GripVertical size={16} />
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} /> Wk
          </div>
          <div>Unit & Focus</div>
          <div>📖 Reading</div>
          <div>🎧 Listening</div>
          <div>💬 Speaking</div>
          <div>✍️ Writing</div>
          <div>📝 Grammar</div>
          <div>📚 Vocabulary</div>
          <div className="text-center">Del</div>
        </div>

        {/* PLAN ROWS */}
        <fieldset
          disabled={!canEdit}
          className="flex flex-col gap-4 xl:gap-0"
        >
          {plan.map((item, weekIdx) => {
            const semesterLabel = getSemesterLabel(weekIdx);
            return (
              <React.Fragment key={item.id}>
                {semesterLabel && (
                  <div className="mt-4 rounded-2xl bg-slate-900 px-5 py-2.5 text-center text-xs font-black uppercase tracking-[0.25em] text-white shadow-lg xl:rounded-none xl:first:mt-0 print:bg-slate-100 print:text-slate-900 print:shadow-none">
                    {semesterLabel}
                  </div>
                )}

                <div
                  draggable={canEdit}
                  onDragStart={(event) => dragRowStart(event, weekIdx)}
                  onDragEnter={(event) => dragRowEnter(event, weekIdx)}
                  onDragEnd={dragRowEnd}
                  onDragOver={(event) => event.preventDefault()}
                  className="print-card group cursor-move rounded-3xl border-2 border-orange-100/80 bg-white/90 p-4 shadow-md transition hover:border-orange-300 hover:shadow-xl xl:rounded-none xl:border-x-0 xl:border-t-0 xl:p-0 xl:shadow-none xl:hover:bg-orange-50/20 print:p-2"
                >
                  <div className="print-grid grid grid-cols-1 items-start gap-3 xl:grid-cols-[50px_70px_1.3fr_1fr_1fr_1fr_1fr_1fr_1fr_50px] xl:p-3">
                    <div className="hidden h-full items-center justify-center text-slate-300 transition group-hover:text-orange-500 xl:flex print:hidden">
                      <GripVertical size={20} strokeWidth={2.4} />
                    </div>

                    <div className="no-print mb-1 flex items-center justify-between border-b-2 border-orange-100 pb-2 xl:hidden">
                      <div className="flex items-center gap-1.5 text-xs font-black text-orange-600">
                        <GripVertical size={16} /> Drag row to reorder week
                      </div>
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="rounded-lg bg-red-50 p-1.5 text-red-500 hover:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    <div className="flex flex-col">
                      <span className="mb-1 flex items-center gap-1 text-[11px] font-black uppercase text-orange-600 xl:hidden print:hidden">
                        <Calendar size={12} /> Week
                      </span>
                      <input
                        type="text"
                        value={item.week}
                        onChange={(e) =>
                          updateItemRaw(weekIdx, "week", e.target.value)
                        }
                        className="w-full rounded-xl border-2 border-orange-200 bg-orange-50/50 px-2 py-1.5 text-center font-black text-slate-800 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                        placeholder="Wk"
                      />
                    </div>

                    <div className="flex flex-col">
                      <span className="mb-1 text-[11px] font-black uppercase text-orange-600 xl:hidden print:hidden">
                        Unit / Focus
                      </span>
                      <textarea
                        value={item.unit}
                        onChange={(e) =>
                          updateItemRaw(weekIdx, "unit", e.target.value)
                        }
                        rows={2}
                        className="w-full resize-none rounded-xl border-2 border-rose-200 bg-rose-50/40 px-2.5 py-1.5 text-xs font-bold leading-tight text-slate-900 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
                        placeholder="Unit Title"
                      />
                    </div>

                    {[
                      "reading",
                      "listening",
                      "speaking",
                      "writing",
                      "grammar",
                      "vocabulary"
                    ].map((field) => {
                      const items = parseItems(item[field]);
                      const style = skillStyles[field];

                      return (
                        <div
                          key={field}
                          className="flex flex-col h-full min-h-[90px]"
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => handleCellDrop(e, weekIdx, field)}
                        >
                          <span
                            className={`mb-1.5 inline-flex w-fit items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-black uppercase xl:hidden print:hidden ${style.badge}`}
                          >
                            {style.icon} {style.label}
                          </span>

                          <div
                            className={`relative flex-1 rounded-2xl border-2 ${style.card} p-2 transition hover:border-slate-300 flex flex-col justify-between`}
                          >
                            {viewMode === "chips" ? (
                              <div className="flex flex-wrap gap-1.5 items-start max-h-[220px] overflow-y-auto pr-1">
                                {items.map((chipText, chipIdx) => (
                                  <div
                                    key={chipIdx}
                                    draggable={canEdit}
                                    onDragStart={(e) =>
                                      handleChipDragStart(
                                        e,
                                        weekIdx,
                                        field,
                                        chipIdx,
                                        chipText
                                      )
                                    }
                                    onDragEnd={handleChipDragEnd}
                                    onClick={() =>
                                      startEditingChip(
                                        weekIdx,
                                        field,
                                        chipIdx,
                                        chipText
                                      )
                                    }
                                    className={`group/chip cursor-grab active:cursor-grabbing flex items-center gap-1 rounded-xl border px-2 py-1 text-[11px] font-bold leading-tight shadow-sm transition ${style.tagBg}`}
                                    title="Drag to move topic, or click to edit"
                                  >
                                    <span className="select-none text-[10px] opacity-40 group-hover/chip:opacity-100">
                                      ⠿
                                    </span>
                                    <span>{chipText}</span>
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        deleteChip(weekIdx, field, chipIdx);
                                      }}
                                      className="ml-0.5 text-slate-400 hover:text-red-600 rounded p-0.5"
                                    >
                                      <X size={10} strokeWidth={3} />
                                    </button>
                                  </div>
                                ))}

                                {items.length === 0 && (
                                  <span className="text-[10px] text-slate-400 italic p-1">
                                    Drop topics here
                                  </span>
                                )}
                              </div>
                            ) : (
                              <textarea
                                value={item[field]}
                                onChange={(e) =>
                                  updateItemRaw(weekIdx, field, e.target.value)
                                }
                                rows={3}
                                className="w-full resize-y bg-transparent text-xs font-semibold leading-relaxed outline-none border-0 p-0"
                                placeholder={`Separate with semicolons...`}
                              />
                            )}

                            <div className="mt-2 pt-1 border-t border-slate-200/50 flex justify-end no-print">
                              <button
                                type="button"
                                onClick={() => addNewChip(weekIdx, field)}
                                className="inline-flex items-center gap-1 text-[10px] font-black text-slate-500 hover:text-orange-600 rounded-lg px-1.5 py-0.5 hover:bg-white/60 transition"
                              >
                                <Plus size={12} strokeWidth={2.5} /> Add
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    <div className="hidden h-full items-center justify-center xl:flex print:hidden">
                      <button
                        onClick={() => setConfirmDeleteId(item.id)}
                        className="rounded-xl p-1.5 text-slate-300 opacity-0 transition hover:scale-110 hover:bg-red-500 hover:text-white group-hover:opacity-100"
                        title="Delete week row"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </fieldset>
      </div>
    </div>
  );
}
