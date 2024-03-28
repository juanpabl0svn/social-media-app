DELIMITER //

CREATE PROCEDURE new_follower(
	IN username_user_follow VARCHAR(255),
    IN username_user_request VARCHAR(255)
)
BEGIN

	DECLARE v_id_user_follow INT;
    DECLARE v_id_user_request INT;
	    -- Declarar un handler para manejar excepciones
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;
    -- Iniciar transaccion
	START TRANSACTION;
    
    SELECT id_user INTO v_id_user_request FROM users WHERE username = username_user_request LIMIT 1;
    
    IF v_id_user_request = null THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario a seguir no existe';
    END IF;
	
    SELECT id_user INTO v_id_user_follow FROM users WHERE username = username_user_follow LIMIT 1;
    
    IF v_id_user_follow = null THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El usuario seguidor no existe';
    END IF;
    
	INSERT INTO followers
	(
	`id_user_request`,
	`id_user_follow`,
	`state`
    )
	VALUES
	(
	v_id_user_request,
	v_id_user_follow,
	'REQUESTED'
    );

    
    END//
    DELIMITER ;