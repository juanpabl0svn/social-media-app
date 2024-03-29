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
    -- Iniciar transaccion
	START TRANSACTION;

	SELECT id_follow INTO v_id_follow FROM followers WHERE id_follow = follow_id;
    
    IF v_id_follow = null THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe follow';
    END IF;
    
	UPDATE followers
	SET
	`state` = 'ACCEPTED',
	`request_update_date` = CURRENT_TIMESTAMP()
	WHERE `id_follow` = follow_id;

END//

DELIMITER ;