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

    SELECT id_user INTO v_nickname
    FROM users
    WHERE nickname = p_nickname;

    SELECT id_user INTO v_email
    FROM users
    WHERE email = p_email;


    -- Calcular la fecha mínima de nacimiento (hace 14 años)
    SET v_min_birth_date = DATE_SUB(CURDATE(), INTERVAL 14 YEAR);

    -- Verificar si la fecha de nacimiento es mayor a 14 años
    IF (p_birth_date >= v_min_birth_date) THEN

        -- Verificar si el nickname ya está en uso
        IF (v_nickname IS NOT NULL) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El nickname ya está en uso';
        END IF;

        -- Verificar si el correo electrónico ya está en uso
        IF (v_email IS NOT NULL) THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'El correo electrónico ya está en uso';
        END IF;

        -- Insertar el nuevo usuario en la tabla de users
        INSERT INTO users (nickname, name, lastname, email, password, create_Date, birth_date)
        VALUES (p_nickname, p_name, p_lastname, p_email, p_password, NOW(), p_birth_date);
        
       COMMIT

    ELSE
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Debes tener al menos 14 años para registrarte';
    END IF;

  
END//
DELIMITER ;
