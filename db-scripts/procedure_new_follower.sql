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
