# Nexus - AI Personal ERP

A modern, AI-powered personal productivity platform that transforms your daily journals into actionable tasks, tracks your progress across all your tools, and guides your career path.

## ✨ Features

- **🔐 Authentication**: Secure email-based authentication via Supabase
- **📝 AI Journal Processing**: Write in natural language; AI extracts tasks, deadlines, and projects
- **✅ Smart Task Management**: Auto-generated tasks with due dates and priorities
- **📊 Personal Dashboard**: Beautiful task overview with progress tracking
- **⚡ Real-time Processing**: Background worker processes journals instantly
- **🎨 Modern UI**: Dark theme inspired by devin.ai with smooth animations

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL) + Redis + BullMQ
- **AI**: OpenAI GPT-3.5-turbo for task extraction
- **Auth**: Supabase Auth with email magic links
- **Deployment**: Docker for local development

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and pnpm
- Docker Desktop
- Supabase account
- OpenAI API key

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd EPPM
pnpm install
```

### 2. Set Up Infrastructure

Start Redis and PostgreSQL containers:

```bash
docker compose up -d redis
```

### 3. Environment Setup

Create these environment files:

**`apps/web/.env.local`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
REDIS_URL=redis://localhost:6379
```

**`apps/worker/.env`:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
REDIS_URL=redis://localhost:6379
OPENAI_API_KEY=your-openai-api-key
```

### 4. Database Setup

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Copy your project URL and keys from Settings → API
3. Run the SQL from `db/schema.sql` in your Supabase SQL editor
4. Run the trigger SQL from `db/triggers.sql` in your Supabase SQL editor

### 5. Get API Keys

- **Supabase**: Get URL and keys from your Supabase project dashboard
- **OpenAI**: Get API key from [platform.openai.com](https://platform.openai.com/api-keys)

### 6. Start the Application

Open two terminal windows:

**Terminal 1 - Web App:**
```bash
pnpm dev
```

**Terminal 2 - Background Worker:**
```bash
pnpm worker
```

### 7. Access the Application

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📖 How to Use

1. **Sign Up**: Click "Sign Up with GitHub" and use email authentication
2. **Create Journal**: Go to `/journal` and write about your day
3. **AI Processing**: The worker automatically extracts tasks from your journal
4. **View Tasks**: Check `/tasks` to see your AI-generated tasks
5. **Track Progress**: Mark tasks as complete and track your productivity

## 📁 Project Structure

```
EPPM/
├── apps/
│   ├── web/                 # Next.js frontend
│   │   ├── app/            # App Router pages
│   │   ├── components/     # React components
│   │   └── lib/           # Utility functions
│   └── worker/             # Background task processor
│       ├── processors/     # Job processors
│       └── llmWrapper.ts  # OpenAI integration
├── packages/
│   └── core/              # Shared schemas and types
├── db/
│   ├── schema.sql         # Database tables
│   └── triggers.sql       # Auto-user creation
├── components/            # Shared UI components
└── docker-compose.yml     # Local development services
```

## 🗄️ Database Schema

The application uses these main tables:

- **`users`**: User profiles and metadata
- **`journals`**: Daily journal entries with AI summaries
- **`tasks`**: Extracted tasks with deadlines and status
- **`integrations`**: Future integrations and settings

## 🤖 AI Task Extraction

The system uses OpenAI's GPT-3.5-turbo to:

1. **Parse** natural language journal entries
2. **Extract** actionable tasks with titles and descriptions
3. **Identify** due dates and deadlines
4. **Categorize** by project or context
5. **Generate** concise summaries

## 🔧 Troubleshooting

### Common Issues

**"Window is not defined" error:**
- Make sure components that use browser APIs have `'use client';` directive

**"Failed to parse cookie string" error:**
- Ensure environment variables don't have extra spaces
- Restart the dev server after changing `.env.local`

**Worker not processing jobs:**
- Check Redis is running: `docker ps`
- Verify OpenAI API key is valid
- Check worker logs for specific errors

**Tasks not appearing:**
- Ensure you're signed in (tasks are user-specific)
- Check worker terminal for processing logs
- Verify Supabase service role key is correct

### Development Commands

```bash
# Start development server
pnpm dev

# Start background worker
pnpm worker

# Start Redis
docker compose up -d redis

# View logs
docker compose logs redis

# Stop all services
docker compose down
```

## 🚀 Next Steps

- **Mobile App**: React Native version
- **Integrations**: GitHub, Google Calendar, Notion
- **Team Features**: Shared workspaces and collaboration
- **Analytics**: Productivity insights and trends
- **Deployment**: Production setup guides

## 📄 License

MIT License © 2025

---

**Need help?** Open an issue or check the troubleshooting section above.