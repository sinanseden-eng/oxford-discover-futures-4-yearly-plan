# Oxford Discover Futures 4 — Collaborative Yearly Planner

A 36-week CEFR B2 curriculum planner built with React, Vite, Tailwind CSS,
Supabase and Gemini. Everyone can view the published plan. Editing is restricted
to teacher email addresses that the owner has invited and approved.

## Included features

- All 36 original weeks restored
- Public read-only viewing
- Passwordless email-link sign-in for invited teachers
- Private approved-teachers email list
- Database-enforced permissions with Row Level Security
- Automatic saving approximately 900 milliseconds after an edit
- Per-week database records to reduce simultaneous-editing conflicts
- Realtime updates in other open browsers
- Local browser backup during a connection problem
- CSV export and print view
- Gemini requests handled by a protected Supabase Edge Function
- Gemini can add, remove, reorder, merge, split and rewrite weeks without a fixed week count
- Netlify-ready production configuration

## 1. Create the Supabase backend

1. Create a Supabase project.
2. Open SQL Editor in the Supabase dashboard.
3. Open supabase/schema.sql from this project.
4. Paste and run the complete SQL file.

This creates the shared plan, the private editor allowlist, the database
permissions and Realtime configuration. The website inserts the original 36
weeks automatically when the first approved teacher signs in.

## 2. Add each recognized teacher

Complete both steps for every teacher.

### Create or invite the authentication user

Open Authentication, then Users in Supabase and invite or create the teacher
email address. The application deliberately prevents unknown addresses from
creating their own accounts through the website.

### Add the same email to the private allowlist

Run this in SQL Editor, using a lowercase address:

    insert into public.approved_editors (email)
    values ('teacher@example.com')
    on conflict (email) do nothing;

Repeat it for each teacher. To remove editing access:

    delete from public.approved_editors
    where email = 'teacher@example.com';

Removing the address from this table blocks editing even if the authentication
account still exists.

## 3. Configure authentication URLs

Open Authentication, then URL Configuration in Supabase.

- Set Site URL to the final Netlify address.
- Add the Netlify address to the allowed redirect URLs.
- During local testing, also allow http://localhost:5173.

Teachers enter their approved address on the website and receive a passwordless
sign-in link.

## 4. Configure the frontend

Copy .env.example to .env locally and enter the values shown under the Supabase
project API settings:

    VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
    VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_PUBLISHABLE_KEY

These two browser values are public by design. Database policies provide the
security. Never place a Supabase secret or service-role key in a VITE variable.

Add the same two variables in Netlify under Site configuration, Environment
variables, then redeploy.

## 5. Deploy the protected Gemini function

Authenticate and link the Supabase CLI:

    npx supabase login
    npx supabase link --project-ref YOUR_PROJECT_REF

Store the server-side Gemini settings:

    npx supabase secrets set GEMINI_API_KEY=YOUR_GEMINI_API_KEY
    npx supabase secrets set GEMINI_MODEL=gemini-3.6-flash
    npx supabase secrets set ALLOWED_ORIGIN=https://YOUR-SITE.netlify.app

Deploy the function:

    npx supabase functions deploy arrange-plan

The Gemini key is never included in the browser bundle. The function verifies
the signed-in user and approved-email status before contacting Gemini.

Gemini receives the complete current plan and may return any positive number of
weeks. Removed rows are deleted from the shared database, new rows receive
unique IDs, and all returned rows are saved automatically.

## 6. Run locally

    npm install
    npm run dev

Open http://localhost:5173.

## 7. Deploy through GitHub and Netlify

Push the complete project to GitHub and connect the repository to Netlify. The
included netlify.toml uses:

    Build command: npm run build
    Publish directory: dist

Do not manually upload the raw source as a static website. For a manual Netlify
deployment, run npm run build and upload the generated dist directory.

## Editing and saving behaviour

- Signed-out visitors can read, export and print.
- Signed-in users absent from approved_editors remain read-only.
- Approved teachers can edit, reorder, add and remove weeks.
- Modified weeks save automatically after a short pause.
- Save now forces an immediate save.
- Other open browsers receive database updates in realtime.
- The browser keeps a local fallback copy.

## Important files

    src/App.jsx
        Planner interface, authentication, autosave and Realtime logic

    src/lib/supabase.js
        Browser database connection

    supabase/schema.sql
        Tables, permission policies and Realtime setup

    supabase/functions/arrange-plan/index.ts
        Protected Gemini integration

    .env.example
        Required frontend environment variables

    netlify.toml
        Netlify build and redirect configuration

## Production verification checklist

- The page displays 36 scheduled weeks.
- A signed-out visitor can read but cannot edit.
- An unknown email cannot create an editor account.
- An invited but non-allowlisted user remains read-only.
- An invited and allowlisted teacher can edit.
- An edit changes the status from Saving to Saved automatically.
- A second browser receives the updated week.
- Gemini cannot replace the plan with fewer than 36 weeks.
- The Gemini key is absent from browser source and frontend variables.
