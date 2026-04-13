# AGENTS.md

This file provides guidance to AI coding agents when working with code in this repository.

## Project Overview

Personal website (edoardo-borsato.github.io) — an AI assistant that answers questions about Edoardo Borsato. Built with Next.js, TypeScript, Tailwind CSS, and the Google Gemini API.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + TypeScript
- **Styling:** Tailwind CSS v4
- **AI:** Google Gemini API via `@google/generative-ai`
- **Deployment:** Vercel

## Common Commands

- `npm run dev` — Start development server
- `npm run build` — Production build (uses webpack instead of Turbopack — see Notes)
- `npm run lint` — Run ESLint
- `npm start` — Start production server

## Architecture

- `src/app/` — Next.js App Router pages and API routes
- `src/app/api/chat/route.ts` — Server-side API route that proxies chat messages to the Gemini API (keeps API key secret)
- `src/components/` — React components (Hero, Experience, Projects, ChatWidget, ChatMessage)
- `src/lib/gemini.ts` — Gemini client singleton
- `src/lib/system-prompt.ts` — System prompt containing Edoardo's bio and instructions for the AI

## Environment Variables

- `GOOGLE_API_KEY` — Required. Set in `.env.local` (local) or Vercel dashboard (production). Never commit this.

## Deployment

This repository deploys to Vercel. GitHub Pages is not used despite the repo name.

## Notes

- The build script uses `next build --webpack` instead of the default Turbopack because Turbopack requires native SWC bindings that had an installation issue on macOS arm64. Remove `--webpack` once native bindings work.
