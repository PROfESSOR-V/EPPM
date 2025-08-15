-- Database trigger to automatically create user profile on signup
-- Run this in your Supabase SQL editor

-- Function to handle new user signup
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, email, created_at)
  values (new.id, new.email, now())
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Drop existing trigger if it exists
drop trigger if exists on_auth_signup on auth.users;

-- Create trigger on auth.users table
create trigger on_auth_signup
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

-- Verify the trigger was created
select trigger_name, event_manipulation, event_object_table 
from information_schema.triggers 
where trigger_name = 'on_auth_signup';
