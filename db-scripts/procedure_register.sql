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
