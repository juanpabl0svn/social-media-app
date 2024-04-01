INSERT INTO users (username, name, last_name,  password, email, birth_date) VALUES
('user1', 'Usuario Uno', 'pass1', 'Zapata','user1@example.com', '1990-01-01'),
('user2', 'Usuario Dos','Zapata', 'pass2', 'user2@example.com', '1991-02-02'),
('user3', 'Usuario Tres','Zapata', 'pass3', 'user3@example.com', '1992-03-03'),
('user4', 'Usuario Cuatro','Zapata', 'pass4', 'user4@example.com', '1993-04-04'),
('user5', 'Usuario Cinco','Zapata', 'pass5', 'user5@example.com', '1994-05-05'),
('user6', 'Usuario Seis','Zapata', 'pass6', 'user6@example.com', '1995-06-06'),
('user7', 'Usuario Siete','Zapata', 'pass7', 'user7@example.com', '1996-07-07'),
('user8', 'Usuario Ocho','Zapata', 'pass8', 'user8@example.com', '1997-08-08'),
('user9', 'Usuario Nueve','Zapata', 'pass9', 'user9@example.com', '1998-09-09'),
('user10', 'Usuario Diez','Zapata', 'pass10', 'user10@example.com', '1999-10-10');

INSERT INTO posts (id_user, uri_resource, title) VALUES
(1, 'http://example.com/resource1.jpg', 'Post Uno'),
(2, 'http://example.com/resource2.jpg', 'Post Dos'),
(3, 'http://example.com/resource3.jpg', 'Post Tres'),
(4, 'http://example.com/resource4.jpg', 'Post Cuatro'),
(5, 'http://example.com/resource5.jpg', 'Post Cinco'),
(6, 'http://example.com/resource6.jpg', 'Post Seis'),
(7, 'http://example.com/resource7.jpg', 'Post Siete'),
(8, 'http://example.com/resource8.jpg', 'Post Ocho'),
(9, 'http://example.com/resource9.jpg', 'Post Nueve'),
(10, 'http://example.com/resource10.jpg', 'Post Diez');

INSERT INTO likes (id_user, id_post, emoji_like) VALUES
(1, 1, TRUE),
(2, 1, TRUE),
(3, 1, TRUE),
(4, 1, TRUE),
(5, 1, TRUE),
(6, 1, TRUE),
(7, 1, TRUE),
(8, 1, TRUE),
(9, 1, TRUE),
(10, 1, TRUE);


INSERT INTO followers (id_user_request, id_user_follow, state) VALUES
(1, 2, 'FOLLOWING'),
(2, 3, 'FOLLOWING'),
(3, 4, 'FOLLOWING'),
(4, 5, 'FOLLOWING'),
(5, 6, 'FOLLOWING'),
(6, 7, 'FOLLOWING'),
(7, 8, 'FOLLOWING'),
(8, 9, 'FOLLOWING'),
(9, 10, 'FOLLOWING'),
(10, 1, 'FOLLOWING');


INSERT INTO comments (id_user, id_post, comment) VALUES
(1, 1, 'Genial post!'),
(2, 1, 'Me encanta!'),
(3, 1, 'Muy interesante.'),
(4, 1, '¿Cómo hiciste eso?'),
(5, 1, 'Increíble.'),
(6, 1, 'Más de esto, por favor.'),
(7, 1, '¿Puedes explicar más?'),
(8, 1, 'No estoy de acuerdo.'),
(9, 1, 'Estoy asombrado.'),
(10, 1, 'Podría ser mejor.');

INSERT INTO direct_messages (id_user_from, id_user_to, message) VALUES
(1, 2, 'Hola, ¿qué tal?'),
(2, 3, 'Hey, mira mi último post.'),
(3, 4, '¿Te gustaría colaborar?'),
(4, 5, 'Me gustó tu comentario.'),
(5, 6, 'Gracias por seguirme.'),
(6, 7, '¿Cómo estás?'),
(7, 8, 'Genial tu foto.'),
(8, 9, 'Nos vemos mañana.'),
(9, 10, 'Tengo una pregunta para ti.'),
(10, 1, 'Gracias por todo.');
