DELIMITER //

CREATE PROCEDURE accept_follower(
	IN follow_id INT
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

	SELECT id_follow, id_user_follow, id_user_request INTO v_id_follow
	FROM followers 
	WHERE id_follow = follow_id;
    
    IF v_id_follow IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe follow';
    END IF;

    -- Confirma la solicitud de follow
	UPDATE followers
	SET
	state = 'ACCEPTED',
	request_update_date = CURRENT_TIMESTAMP()
	WHERE id_follow = follow_id;


END//

DELIMITER ;

-- Revisar bien el user_request y user_follow
-- Deberiamos revisar si se hizo una peticion de follow antes de aceptar