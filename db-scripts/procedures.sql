DELIMITER //

CREATE PROCEDURE accept_follower(
	IN p_id_follow INT
)
BEGIN
	DECLARE v_id_follow INT;

	-- Declarar un handler para manejar excepciones
	DECLARE EXIT HANDLER FOR SQLEXCEPTION
	BEGIN
	-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;

	SELECT id_follow INTO v_id_follow
	FROM followers 
	WHERE id_follow = p_id_follow AND state = 'REQUESTED'
	LIMIT 1;
	
	IF v_id_follow IS NULL THEN
	SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe la solicitud de follow';
	END IF;

	-- Confirma la solicitud de follow
	UPDATE followers
	SET
	state = 'ACCEPTED',
	request_update_date = CURRENT_TIMESTAMP()
	WHERE id_follow = v_id_follow;

	COMMIT;
END//

DELIMITER ;


DELIMITER //

CREATE PROCEDURE delete_post(
    IN p_id_post INT
)
BEGIN

    DECLARE v_id_post INT;
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;

    SELECT id_post INTO v_id_post
    FROM posts
    WHERE id_post = p_id_post;

    IF v_id_post IS NULL THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario no existe';
    END IF;



    DELETE from likes
    WHERE id_post = p_id_post;

    DELETE from comments
    WHERE id_post = p_id_post;
    
    DELETE from posts
    WHERE id_post = p_id_post;

    COMMIT;

END//

DELIMITER ;

DELIMITER //

CREATE PROCEDURE new_follower(
	IN username_user_follow VARCHAR(255),
    IN username_user_request VARCHAR(255)
)
BEGIN
	DECLARE v_id_user_follow INT;
    DECLARE v_id_user_request INT;
    DECLARE v_id_follow INT;
	    -- Declarar un handler para manejar excepciones
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;
    
    SELECT id_user INTO v_id_user_request 
	FROM users 
	WHERE username = username_user_request 
	LIMIT 1;
    
    IF v_id_user_request = null THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario a seguir no existe';
    END IF;
	
    SELECT id_user 
	INTO v_id_user_follow 
	FROM users 
	WHERE username = username_user_follow 
	LIMIT 1;
    
    IF v_id_user_follow IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario seguidor no existe';
    END IF;
    
    SELECT id_follow INTO v_id_follow
    FROM followers
    WHERE id_user_request = v_id_user_request
    AND id_user_follow = v_id_user_follow;
    
    IF v_id_follow IS NOT NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Ya enviaste solicitud a este usuario o ya lo sigues';
    END IF;
    
	INSERT INTO followers
	(
	id_user_request,
	id_user_follow,
	state
    )
	VALUES
	(
	v_id_user_request,
	v_id_user_follow,
	'PENDING'
    );

	COMMIT;
END//
DELIMITER ;

DELIMITER //

CREATE PROCEDURE register_user(
    IN p_username VARCHAR(100),
    IN p_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100),
    IN p_birth_date VARCHAR(100)
)
BEGIN

    DECLARE v_username VARCHAR(255);
    DECLARE v_email VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;

    IF TIMESTAMPDIFF(YEAR, p_birth_date, CURDATE()) < 14 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debes tener al menos 14 años para registrarte';
    END IF;
    

    SELECT username, email INTO v_username, v_email
    FROM users
    WHERE username = p_username or email = p_email;


    IF (v_username IS NOT NULL) THEN
        IF (v_username = p_username) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nickname ya esta en uso';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email ya está en uso';
        END IF;
    END IF;


    INSERT INTO users (username, name, last_name, email, password, birth_date)
    VALUES (p_username, p_name, p_last_name, p_email, p_password, p_birth_date);
        
    COMMIT;
        
END//
DELIMITER ;

DELIMITER //

CREATE PROCEDURE unfollow_user(
	IN p_user_to_unfollow VARCHAR(255),
	IN p_current_user VARCHAR(255)
)
BEGIN
	DECLARE v_id_follow INT;
    DECLARE v_id_current_user VARCHAR(255);
    DECLARE v_id_user_to_unfollow VARCHAR(255);

	-- Declarar un handler para manejar excepciones
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
	-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;
    
    
    SELECT id_user into v_id_current_user
    FROM users
    WHERE username = p_current_user;

	IF v_id_current_user IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario actual no existe';
	END IF;
	
	SELECT id_user into v_id_user_to_unfollow
	FROM users
	WHERE username = p_user_to_unfollow;

	IF v_id_user_to_unfollow IS NULL THEN
		SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario a dejar de seguir no existe';
	END IF;


	SELECT f.id_follow INTO v_id_follow
	FROM followers AS f
    INNER JOIN users AS u1 ON f.id_user_follow = u1.id_user
    INNER JOIN users AS u2 ON f.id_user_request = u2.id_user
    WHERE f.id_user_request = v_id_current_user AND f.id_user_follow = v_id_user_to_unfollow
    LIMIT 1;
    
    IF v_id_follow IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe follow';
    END IF;

    -- Confirma la solicitud de unfollow

	DELETE FROM followers
	WHERE id_follow = v_id_follow;


END//

DELIMITER ;

