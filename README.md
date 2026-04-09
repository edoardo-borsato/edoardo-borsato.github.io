# edoardo-borsato.github.io

Personal website with an AI chatbot that answers questions about me.

## Tech Stack

- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Tailwind CSS
- **AI:** Anthropic Claude API
- **Deployment:** Vercel

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file with your Anthropic API key:
   ```
   ANTHROPIC_API_KEY=your-api-key-here
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
│   ├── api/chat/route.ts    # API route proxying to Anthropic
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
    ├── anthropic.ts         # Anthropic API client
    └── system-prompt.ts     # System prompt with bio
```

## Deployment

Deploy to Vercel by connecting this repository. Add `ANTHROPIC_API_KEY` as an environment variable in the Vercel dashboard under Settings > Environment Variables.
