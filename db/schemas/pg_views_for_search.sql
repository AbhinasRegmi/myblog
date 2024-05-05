create or replace
view
title_myblog
as
select c.content as title, blog_id
from
blog_myblog as b
inner join
component_myblog as c
on b.id = c.blog_id
where
c.type = 'title' and
c.number = 1 and
b.status = 'PUBLISHED';

create or replace
view
body_myblog
as
select c.content as body, blog_id
from
blog_myblog as b
inner join
component_myblog as c
on b.id = c.blog_id
where
b.status = 'PUBLISHED' and
c.id in (
  select cc.id 
  from component_myblog as cc 
  where cc.type = 'paragraph' and 
  cc.blog_id = b.id order by cc.number limit 1
);

create or replace
view
search_myblog as
select title, body, b.blog_id as id
from
title_myblog as t  
inner join  
body_myblog as b  
on t.blog_id = b.blog_id;