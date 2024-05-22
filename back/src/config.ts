import dotenv from "dotenv";

dotenv.config();

export const mysqlUsername = process.env.MYSQL_USERNAME ?? "root";

export const mysqlPassword = process.env.MYSQL_PASSWORD_ ?? "example";

export const mysqlSchema = process.env.MYSQL_SCHEMA ?? "instapic";

export const mysqlHost = process.env.MYSQL_HOST ?? "localhost";

export const mysqlPort = process.env.MYSQL_PORT ?? "3306";

export const PORT = process.env.PORT ?? 5000;

export const SALT = process.env.SALT ?? 10;
