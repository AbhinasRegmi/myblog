create or replace function
full_text_search(q text)
returns 
table(title text, id uuid, rank real) 
as $$
  begin
    return
      query 
        select s.title as title, b.id as id, ts_rank_cd(b.search_idx, websearch_to_tsquery(q)) as rank 
        from blog_myblog as b 
        inner join search_myblog as s 
        on b.id = s.id 
        where b.search_idx @@ websearch_to_tsquery(q) 
        and b.status = 'PUBLISHED'
        order by rank 
        desc;
  end;
$$ language plpgsql;
