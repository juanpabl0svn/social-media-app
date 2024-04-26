
-- PARA VER NUEVOS POSTS EN EL FEED
CREATE VIEW get_last_posts_feed AS 
    SELECT * from posts AS p
    INNER JOIN users AS u USING (id_user)
    INNER JOIN followers AS f ON f.id_user_follow = p.id_user
    WHERE f.state = 'ACCEPTED'
    ORDER BY p.post_date DESC


CREATE VIEW get_locked_users AS
    SELECT * FROM users AS u
    INNER JOIN audits as a USING (id_user)
    WHERE a.reason = 'LOCKED'