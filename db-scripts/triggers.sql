DELIMITER //

CREATE TRIGGER before_insert_direct_message
BEFORE INSERT ON direct_messages
FOR EACH ROW
BEGIN
    DECLARE sender_follower_status INT;
    DECLARE sender_blocked_status BOOLEAN;
    
    -- Verificar si el remitente es seguido por el destinatario
    SELECT COUNT(*) INTO sender_follower_status
    FROM followers
    WHERE follower_id = NEW.id_user_to AND following_id = NEW.id_user_from AND status = 'ACCEPTED';
    
    -- Verificar si el remitente está bloqueado
    SELECT bloqueado INTO sender_blocked_status
    FROM users
    WHERE id_user = NEW.id_user_from;
    
    -- Si el remitente no es seguido por el destinatario o está bloqueado, evita la inserción del mensaje
    IF sender_follower_status = 0 OR sender_blocked_status THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El mensaje no puede ser enviado debido a restricciones de seguimiento o bloqueo.';
    END IF;
END;
//

DELIMITER ;
