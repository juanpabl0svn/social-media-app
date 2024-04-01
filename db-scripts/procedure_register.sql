DELIMITER //

CREATE PROCEDURE register_user(
    IN p_username VARCHAR(100),
    IN p_name VARCHAR(100),
    IN p_last_name VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100),
    IN p_birth_date VARCHAR(100)
)
BEGIN

    DECLARE v_username VARCHAR(255);
    DECLARE v_email VARCHAR(255);
    
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
		-- Rollback en caso de excepcion
		ROLLBACK;
		-- Relanzar la excepcion para que sea manejada por el cliente
		RESIGNAL;
	END;

	START TRANSACTION;

    IF TIMESTAMPDIFF(YEAR, p_birth_date, CURDATE()) < 14 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debes tener al menos 14 años para registrarte';
    END IF;
    

    SELECT username, email INTO v_username, v_email
    FROM users
    WHERE username = p_username or email = p_email;


    IF (v_username IS NOT NULL) THEN
        IF (v_username = p_username) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nickname ya esta en uso';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email ya está en uso';
        END IF;
    END IF;


    INSERT INTO users (username, name, last_name, email, password, birth_date)
    VALUES (p_username, p_name, p_last_name, p_email, p_password, p_birth_date);
        
    COMMIT;
        
END//
DELIMITER ;
