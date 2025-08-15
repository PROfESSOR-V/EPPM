-- users
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  name text,
  avatar_url text,
  github_id text unique,
  created_at timestamptz default now()
);

-- journals
create table if not exists journals (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  content text,
  summary text,
  extracted jsonb,
  created_at timestamptz default now()
);

-- tasks
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  title text,
  description text,
  due_at timestamptz,
  status text default 'PENDING',
  source text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- integrations
create table if not exists integrations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade,
  provider text,
  credentials jsonb,
  created_at timestamptz default now()
);
