-- Run this in your Supabase SQL Editor

create table if not exists transactions (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  description text not null,
  amount numeric(10, 2) not null check (amount > 0),
  date date not null,
  type text not null check (type in ('income', 'expense')),
  category text not null,
  created_at timestamptz default now() not null
);

-- Row Level Security
alter table transactions enable row level security;

create policy "Users can read their own transactions"
  on transactions for select
  using (auth.uid() = user_id);

create policy "Users can insert their own transactions"
  on transactions for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own transactions"
  on transactions for update
  using (auth.uid() = user_id);

create policy "Users can delete their own transactions"
  on transactions for delete
  using (auth.uid() = user_id);

-- Index for faster queries
create index transactions_user_date_idx on transactions (user_id, date desc);
