# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/37141832-a817-4039-8052-da4ae6500ad9

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/37141832-a817-4039-8052-da4ae6500ad9) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Running locally without Supabase (frontend-only)

This project can run purely as a frontend application using the Hugging Face Inference API for AI-generated designs. No Supabase backend is required for the core generation flow.

Steps:

1. Create a `.env` file in the project root (if it doesn't exist) and add your Hugging Face token:

```env
VITE_HUGGING_FACE_API_KEY="your-hf-token-here"
```

2. Install dependencies and start the dev server:

```powershell
npm install
npm run dev
```

3. Open the app in your browser (Vite will print the local URL). Use the UI to enter business card info and generate AI designs.

Notes:
- The repo still contains a `supabase/` folder and optional Supabase integration under `src/integrations/supabase/`. These are legacy and can be removed if you don't plan to use Supabase.
- If you hit API limits, consider reducing the `count` parameter or adding client-side retries/backoff.

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/37141832-a817-4039-8052-da4ae6500ad9) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
