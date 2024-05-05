alter table
blog_myblog
add column if not exists search_idx tsvector;

create or replace function update_search_idx() returns trigger as $$
  begin
    if new.id is null then
      raise exception 'Id cannot be null';
    end if;

    new.search_idx := setweight(to_tsvector(coalesce((select title from search_myblog as s where s.id = new.id ), '')), 'A') || setweight(to_tsvector(coalesce((select body from search_myblog as s where s.id = new.id ), '')), 'B');
    return new;
  end;
$$ language plpgsql;

create or replace trigger update_trigger_for_blog
before update on blog_myblog
for each row
execute function update_search_idx();

create index if not exists blog_search_idx
on
blog_myblog
using gin (search_idx);