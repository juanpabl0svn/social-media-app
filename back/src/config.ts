import dotenv from "dotenv";

dotenv.config();

export const mysqlUsernameUsers = process.env.MYSQL_USERNAME_USERS ?? "root";

export const mysqlPasswordUsers = process.env.MYSQL_PASSWORD_USERS ?? "example"; 

export const PORT = process.env.PORT ?? 5000;
