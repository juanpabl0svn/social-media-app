DELIMITER //

CREATE PROCEDURE RegistrarUsuario(
    IN p_nickname VARCHAR(100),
    IN p_name VARCHAR(100),
    IN p_lastname VARCHAR(100),
    IN p_email VARCHAR(100),
    IN p_password VARCHAR(100),
    IN p_birth_date DATE
)
BEGIN
    DECLARE v_min_birth_date DATE;
    DECLARE v_nickname DATE;
    DECLARE v_email DATE;
    
    BEGIN
        -- Rollback en caso de excepcion
        ROLLBACK;
        -- Relanzar la excepcion para que sea manejada por el cliente
        RESIGNAL;
        END;

    START TRANSACTION;

    SELECT nickname, email INTO v_nickname, v_email
    FROM users
    WHERE nickname = p_nickname or email = p_email;


    SET v_min_birth_date = DATE_SUB(CURDATE(), INTERVAL 14 YEAR);

    IF (p_birth_date < v_min_birth_date) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debes tener al menos 14 años para registrarte';
    END IF;

    IF (v_nickname IS NOT NULL) THEN
        IF (v_nickname = p_nickname) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nickname ya esta en uso';
        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El email ya está en uso';
        END IF;
    END IF;


    -- Insertar el nuevo usuario en la tabla de users
    INSERT INTO users (nickname, name, lastname, email, password, birth_date)
    VALUES (p_nickname, p_name, p_lastname, p_email, p_password, p_birth_date);
        
    COMMIT;
        
END//
DELIMITER ;
