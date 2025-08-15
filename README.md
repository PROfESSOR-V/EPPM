# AI Personal ERP

A modern, AI-powered personal productivity & learning hub for students and professionals.

## ✨ Features
- **Auth**: GitHub OAuth + email via Supabase.
- **Journal → Tasks**: Enter a daily journal; an LLM summarises and extracts actionable tasks & deadlines.
- **Dashboard**: List & calendar view; mark tasks done.
- **Background Jobs**: BullMQ + Redis worker for heavy LLM calls.
- **Integrations**: GitHub repo import today, LinkedIn profile parsing tomorrow.
- **Tech**: Next.js (App Router) + TypeScript + Tailwind CSS + Supabase (Postgres) + Redis.

## 🛠️ Quick start (local)
```bash
pnpm install
cp .env.example .env           # fill keys
docker-compose up -d           # postgres + redis
pnpm run seed                  # demo data
pnpm dev                       # http://localhost:3000
pnpm worker                    # background task consumer
```

## 📁 Repo layout
```
.
├─ apps
│  ├─ web            # Next.js app (App Router)
│  └─ worker         # BullMQ consumer
├─ packages
│  └─ core           # Shared types & zod schemas
├─ server
│  └─ scrapers
│     └─ linkedin    # Placeholder
├─ db/schema.sql     # Supabase tables
├─ scripts/seed-demo.ts
└─ tests             # Jest unit tests
```

## 🗄️ Database schema
See `db/schema.sql` for full SQL for Supabase. Tables: `users`, `journals`, `tasks`, `integrations`.

## 🤖 LLM Extraction Prompt
The worker uses the strict JSON extractor prompt contained in `packages/core/llmPrompt.ts`.

## 🧪 E2E Scenario
1. Sign-in with GitHub.
2. Create a journal entry.
3. Wait a few seconds for the worker to extract tasks.
4. Accept / edit extracted tasks.
5. See tasks in Dashboard.

## 🚀 Next steps
- Real LinkedIn scraping using official API or AWS Lambda w/ proxy rotation.
- Notification agents (email / WhatsApp) configurable via no-code GUI.
- Deployment pipeline (Fly.io / Vercel + Supabase).

---

MIT License © 2025