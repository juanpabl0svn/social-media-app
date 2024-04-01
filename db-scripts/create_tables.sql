use instapic;

CREATE TABLE IF NOT EXISTS users (
	id_user INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
    birth_date DATE NOT NULL
);
-- ?
-- city
-- country
-- phone
-- aditional information
-- followers 
-- following
-- posts
-- description 
-- ?

CREATE TABLE posts (
	id_post INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    uri_resource VARCHAR(255) NOT NULL,
    post_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    title VARCHAR(255),
    FOREIGN KEY (id_user) REFERENCES users(id_user)
);
-- ?
-- likes
-- comments
-- shares
-- location (optional)
-- several posts? images and videos all in one
-- ?

CREATE TABLE likes (
	id_like INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_post INT,
    emoji_like BOOLEAN NOT NULL,
    like_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_post) REFERENCES posts(id_post)
);

-- ?
-- like_date is necessary
-- ? 

CREATE TABLE followers (
	id_follow INT PRIMARY KEY AUTO_INCREMENT,
    id_user_request INT,
    id_user_follow INT,
    state VARCHAR(255) NOT NULL,
    request_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    request_update_date TIMESTAMP NULL DEFAULT NULL,
    FOREIGN KEY (id_user_request) REFERENCES users(id_user),
    FOREIGN KEY (id_user_follow) REFERENCES users(id_user)
);

-- ?
-- which one is which user_request or user_follow
-- state should be a enum ('REQUESTED', 'FOLLOWING', 'BLOCKED', 'REJECTED')
-- ?

CREATE TABLE comments (
	id_comment INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_post INT,
    comment VARCHAR(255) NOT NULL,
    comment_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user) REFERENCES users(id_user),
    FOREIGN KEY (id_post) REFERENCES posts(id_post)
);




CREATE TABLE direct_messages (
	id_message INT PRIMARY KEY AUTO_INCREMENT,
    id_user_from INT,
    id_user_to INT,
    message VARCHAR(255) NOT NULL,
    message_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_user_from) REFERENCES users(id_user),
    FOREIGN KEY (id_user_to) REFERENCES users(id_user)
);

-- ? 
-- messages should be bigger
-- ?