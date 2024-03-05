
create table 
  profiles (
    id uuid primary key references auth.users (id),
    email varchar not null,
    username varchar not null,
    name varchar not null,
    site varchar,
    phone varchar,
    bio varchar,
    avatar_url varchar not null,
    address jsonb,
    created_at timestamp with time zone default current_timestamp not null,
    payment_connected_account varchar
  )
