DELIMITER //

CREATE PROCEDURE unfollow_user(
	IN current_user INT,
    IN user_to_unfollow INT
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



	SELECT f.id_follow INTO v_id_follow
	FROM followers AS f
    INNER JOIN users AS u1 ON followers.id_user_follow = users.id_user
    INNER JOIN users AS u2 ON followers.id_user_request = u2.id_user
    WHERE followers.id_user_request = current_user AND followers.id_user_follow = user_to_unfollow
    limit 1;
    
    IF v_id_follow IS NULL THEN
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'No existe follow';
    END IF;

    -- Confirma la solicitud de unfollow
	UPDATE followers
	SET
	state = 'UNFOLLOWED',
	request_update_date = CURRENT_TIMESTAMP()
	WHERE id_follow = v_id_follow;

	-- Actualiza los seguidos de la persona que dejo de seguir al otro
	UPDATE users
	SET following = following - 1
	WHERE id_user = v_id_user_request;

	-- Actualiza los seguidores de la persona que se dejo de seguir
	UPDATE users
	SET followers = followers - 1
	WHERE id_user = v_id_follow;

END//

DELIMITER ;