
create
  or replace function add_new_user_to_profile_function()
  returns trigger as $$
begin
  insert into public.profiles (id, email, username, name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'user_name',
    new.raw_user_meta_data->>'name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;
