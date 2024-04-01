DELIMITER //

CREATE PROCEDURE unfollow_user(
	IN p_current_user VARCHAR(255),
    IN p_user_to_unfollow VARCHAR(255)
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