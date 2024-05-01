CREATE INDEX index_username ON users (username);
CREATE INDEX index_comments_post ON comments(id_post);
CREATE INDEX index_likes_post on likes (id_post)
