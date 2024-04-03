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
