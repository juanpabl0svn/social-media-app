"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SECRET = exports.FIREBASE_APPID = exports.FIREBASE_MESSAGESENDERID = exports.FIREBASE_STORAGEBUCKET = exports.FIREBASE_PROJECTID = exports.FIREBASE_AUTHDOMAIN = exports.FIREBASE_APIKEY = exports.SALT = exports.PORT = exports.DB_ANON = exports.DB_URL = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.DB_URL = process.env.DB_URL || "";
exports.DB_ANON = process.env.DB_ANON || "";
exports.PORT = process.env.PORT ?? 5000;
exports.SALT = process.env.SALT ?? 10;
exports.FIREBASE_APIKEY = process.env.FIREBASE_APIKEY;
exports.FIREBASE_AUTHDOMAIN = process.env.FIREBASE_AUTHDOMAIN;
exports.FIREBASE_PROJECTID = process.env.FIREBASE_PROJECTID;
exports.FIREBASE_STORAGEBUCKET = process.env.FIREBASE_STORAGEBUCKET;
exports.FIREBASE_MESSAGESENDERID = process.env.FIREBASE_MESSAGESENDERID;
exports.FIREBASE_APPID = process.env.FIREBASE_APPID;
exports.SECRET = process.env.SECRET || "j2";
