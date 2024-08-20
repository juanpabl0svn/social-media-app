"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPosts = getAllPosts;
exports.getAllUserPosts = getAllUserPosts;
exports.createNewPost = createNewPost;
const db_firebase_1 = require("../db.firebase");
const storage_1 = require("firebase/storage");
const db_postgres_1 = __importDefault(require("../db.postgres"));
async function getAllPosts() {
    try {
        const { data } = await db_postgres_1.default.from("posts").select(`
    id_post,
    image_src,
    description,
    id_user,
    users (
      username
    )
  `);
        return data;
    }
    catch (err) {
        console.error(err);
        return err;
    }
}
async function getAllUserPosts(id_user) {
    try {
        const { data } = await db_postgres_1.default
            .from("posts")
            .select("*")
            .eq("id_user", id_user);
        return data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
async function createNewPost(file, postData) {
    const data = {
        id_user: postData.id_user,
        description: postData.description,
        imageSrc: "",
    };
    try {
        const storageRef = (0, storage_1.ref)(db_firebase_1.storage, `posts/${Date.now()}_${file.originalname}`);
        await (0, storage_1.uploadBytes)(storageRef, file.buffer, {
            contentType: file.mimetype,
        });
        const downloadURL = await (0, storage_1.getDownloadURL)(storageRef);
        data.imageSrc = downloadURL;
        const { data: post } = await db_postgres_1.default
            .from("posts")
            .insert({
            id_user: data.id_user,
            description: data.description,
            image_src: data.imageSrc,
        })
            .select()
            .single();
        return post;
    }
    catch (err) {
        console.error(err);
        return;
    }
}
