DELIMITER //

CREATE TRIGGER before_insert_direct_message BEFORE INSERT ON direct_messages
FOR EACH ROW
BEGIN
    DECLARE sender_exists BOOLEAN DEFAULT FALSE;
    DECLARE sender_blocked BOOLEAN DEFAULT FALSE;

    -- Verificar si el remitente es seguido por el destinatario
    SELECT EXISTS (
        SELECT 1
        FROM followers AS f
        WHERE f.id_user_request = NEW.id_user_from
          AND f.id_user_follow = NEW.id_user_to
          AND f.state = 'ACCEPTED'
    ) INTO sender_exists;

    IF NOT sender_exists THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El usuario no ha aceptado tu solicitud de follow o aun no lo sigues';
    END IF;

    -- Verificar si el remitente está bloqueado
    SELECT EXISTS (
        SELECT 1
        FROM audits
        WHERE id_user = NEW.id_user_from
    ) INTO sender_blocked;

    IF sender_blocked THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'El mensaje no puede ser enviado debido a que esta cuenta esta bloqueada';
    END IF;
END;

//
DELIMITER ;
