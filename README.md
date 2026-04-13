# edoardo-borsato.github.io

Personal website with an AI chatbot that answers questions about me.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **AI:** Google Gemini API
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Google API key (get one at [aistudio.google.com](https://aistudio.google.com/app/apikey)):
   ```
   GOOGLE_API_KEY=your-api-key-here
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/
│   ├── api/chat/route.ts    # API route proxying to Gemini
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── Hero.tsx             # Intro section
│   ├── Experience.tsx       # Experience & highlights
│   ├── Projects.tsx         # Projects showcase
│   ├── ChatWidget.tsx       # AI chatbot widget
│   └── ChatMessage.tsx      # Chat message bubble
└── lib/
    ├── gemini.ts            # Gemini API client
    └── system-prompt.ts     # System prompt with bio
```

## Deployment

Deploy to Vercel by connecting this repository. Add `GOOGLE_API_KEY` as an environment variable in the Vercel dashboard under Settings > Environment Variables.
