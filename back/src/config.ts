import dotenv from "dotenv";

dotenv.config();

export const DB_URL = process.env.DB_URL || "";

export const DB_ANON = process.env.DB_ANON || "";

export const PORT = process.env.PORT ?? 5000;

export const SALT = process.env.SALT ?? 10;

export const FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;

export const FIREBASE_AUTHDOMAIN = process.env.FIREBASE_AUTHDOMAIN;

export const FIREBASE_PROJECTID = process.env.FIREBASE_PROJECTID;

export const FIREBASE_STORAGEBUCKET = process.env.FIREBASE_STORAGEBUCKET;

export const FIREBASE_MESSAGESENDERID = process.env.FIREBASE_MESSAGESENDERID;

export const FIREBASE_APPID = process.env.FIREBASE_APPID;

export const SECRET = process.env.SECRET || "j2";
