import dotenv from "dotenv";

dotenv.config();

export const SECRET = process.env.SECRET ?? "secret";

export const mysqlUsername = process.env.MYSQL_USERNAME ?? "root";

export const mysqlPassword = process.env.MYSQL_PASSWORD_ ?? "example";

export const mysqlSchema = process.env.MYSQL_SCHEMA ?? "instapic";

export const mysqlHost = process.env.MYSQL_HOST ?? "localhost";

export const mysqlPort = process.env.MYSQL_PORT ?? "3306";

export const PORT = process.env.PORT ?? 5000;

export const SALT = process.env.SALT ?? 10;

export const FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;

export const FIREBASE_AUTHDOMAIN = process.env.FIREBASE_AUTHDOMAIN;

export const FIREBASE_PROJECTID = process.env.FIREBASE_PROJECTID;

export const FIREBASE_STORAGEBUCKET = process.env.FIREBASE_STORAGEBUCKET;

export const FIREBASE_MESSAGESENDERID = process.env.FIREBASE_MESSAGESENDERID;

export const FIREBASE_APPID = process.env.FIREBASE_APPID;
