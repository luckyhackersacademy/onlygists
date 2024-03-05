
create table
  gists (
    id uuid primary key,
    profile_id uuid references public.profiles (id),
    is_paid boolean not null,
    title varchar not null,
    description varchar not null,
    lang varchar not null,
    price integer not null,
    content text not null,
    created_at timestamp with time zone default current_timestamp not null
  )
