DELIMITER //

CREATE PROCEDURE register_user(
    IN p_username VARCHAR(100),
    IN p_name VARCHAR(100),
    IN p_lastname VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100),
)
BEGIN
    DECLARE v_min_birth_date DATE;
    DECLARE v_usernmae DATE;
    DECLARE v_email DATE;
    
    BEGIN
        -- Rollback en caso de excepcion
        ROLLBACK;
        -- Relanzar la excepcion para que sea manejada por el cliente
        RESIGNAL;
        END;

    START TRANSACTION;

    SELECT usernmae, email INTO v_usernmae, v_email
    FROM users
    WHERE username = p_username or email = p_email;


    SET v_min_birth_date = DATE_SUB(CURDATE(), INTERVAL 14 YEAR);

    IF (p_birth_date < v_min_birth_date) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debes tener al menos 14 años para registrarte';
    END IF;

    IF (v_usernmae IS NOT NULL) THEN
        IF (v_usernmae = p_username) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nickname ya esta en uso';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email ya está en uso';
        END IF;
    END IF;


    -- Insertar el nuevo usuario en la tabla de users
    INSERT INTO users (nickname, name, lastname, email, password, birth_date)
    VALUES (p_username, p_name, p_lastname, p_email, p_password, p_birth_date);
        
    COMMIT;
        
END//
DELIMITER ;
