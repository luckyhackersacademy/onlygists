
create trigger add_user_to_profile_trigger
  after insert on auth.users
for each row execute procedure add_new_user_to_profile_function();
