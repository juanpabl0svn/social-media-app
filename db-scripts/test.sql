INSERT INTO users (username, name, last_name, password, email, birth_date)
VALUES ('john_doe', 'John', 'Doe', 'password123', 'john.doe@example.com', '1990-05-15');

INSERT INTO users (username, name, last_name, password, email, birth_date)
VALUES ('jane_smith', 'Jane', 'Smith', 'p@$$w0rd', 'jane.smith@example.com', '1985-10-20');

INSERT INTO users (username, name, last_name, password, email, birth_date)
VALUES ('mike_jones', 'Mike', 'Jones', 'secure123', 'mike.jones@example.com', '1995-03-08');

INSERT INTO users (username, name, last_name, password, email, birth_date)
VALUES ('alice_green', 'Alice', 'Green', '123456', 'alice.green@example.com', '1988-07-12');

CALL new_follower('john_doe', 'jane_smith');

CALL accept_follower(1);

CALL unfollow_user('john_doe', 'jane_smith');