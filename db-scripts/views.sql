
-- MUESTRA LA INFORMACIÓN DE LOS USUARIOS
CREATE VIEW user_details AS
SELECT 
    u.id_user,
    u.username,
    u.name,
    u.last_name,
    u.email,
    u.birth_date,
    COUNT(p.id_post) AS total_posts,
    (SELECT COUNT(*) FROM followers WHERE id_user_follow = u.id_user AND state = 'ACCEPTED') AS followers,
    (SELECT COUNT(*) FROM followers WHERE id_user_request = u.id_user AND state = 'ACCEPTED') AS following
FROM 
    users u
LEFT JOIN 
    posts p ON u.id_user = p.id_user
GROUP BY
    u.id_user;


-- MUESTRA LOS SEGUIDORES Y SI LOS SIGO DE VUELTA
CREATE VIEW my_followers_and_following AS
SELECT 
    u.id_user AS my_user_id,
    u.username AS my_username,
    f.id_user_request AS follower_id,
    uf.username AS follower_username,
    CASE
        WHEN fr.id_follow IS NOT NULL THEN 'YES'
        ELSE 'NO'
    END AS i_follow_them_back
FROM 
    followers f
JOIN 
    users u ON f.id_user_follow = u.id_user
JOIN 
    users uf ON f.id_user_request = uf.id_user
LEFT JOIN 
    followers fr ON fr.id_user_request = u.id_user AND fr.id_user_follow = f.id_user_request AND fr.state = 'ACCEPTED'
WHERE 
    f.state = 'ACCEPTED';

