create table if not exists public.waitlist_signups (
	id uuid primary key default gen_random_uuid(),
	email text not null,
	locale text not null default 'en',
	created_at timestamptz not null default now(),
	constraint waitlist_signups_email_unique unique (email)
);

create index if not exists waitlist_signups_created_at_idx
	on public.waitlist_signups (created_at desc);

alter table public.waitlist_signups enable row level security;

comment on table public.waitlist_signups is 'Download page waitlist signups from parfect.app';
