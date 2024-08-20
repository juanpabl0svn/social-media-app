"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyUser = exports.setToken = exports.getUserData = exports.getMyData = void 0;
exports.registerUser = registerUser;
exports.logInUser = logInUser;
exports.updateProfile = updateProfile;
exports.getUser = getUser;
exports.getUsers = getUsers;
const config_1 = require("../config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_postgres_1 = __importDefault(require("../db.postgres"));
async function registerUser(name, username, email, password, birth_date) {
    password = await bcrypt_1.default.hash(password, +config_1.SALT);
    try {
        const { data, error } = await db_postgres_1.default
            .from("users")
            .insert({
            username,
            name,
            email,
            password,
            birth_date,
        })
            .select().single();
        if (error) {
            console.log(error);
            return { error: error.details };
        }
        return data;
    }
    catch (err) {
        return err;
    }
}
async function logInUser(username, password) {
    try {
        const { data } = await db_postgres_1.default
            .from("users")
            .select("*")
            .eq("username", username)
            .single();
        if (!data)
            return null;
        const isValidPassword = await bcrypt_1.default.compare(password, data.password);
        if (!isValidPassword)
            return null;
        return data;
    }
    catch (err) {
        return err;
    }
}
async function updateProfile(id_user, name, username, email, birth_date, password) {
    try {
        const { data } = await db_postgres_1.default.from("users").select("*").eq("id_user", id_user).single();
        if (data?.username !== username) {
            const { data: usernameExists } = await db_postgres_1.default.from("users").select("*").eq("username", username).single();
            if (usernameExists)
                return false;
        }
        if (data?.password !== password) {
            console.log(password);
            password = await bcrypt_1.default.hash(password, +config_1.SALT);
        }
        const { data: newUser } = await db_postgres_1.default
            .from("users")
            .update({
            name,
            username,
            email,
            birth_date,
            password
        })
            .eq("id_user", id_user).select().single();
        return newUser;
    }
    catch (err) {
        console.error(err);
        return false;
    }
}
async function getUser(id_user) {
    try {
        const { data } = await db_postgres_1.default
            .from("users")
            .select("*")
            .eq("id_user", id_user)
            .single();
        return data;
    }
    catch (err) {
        console.error(err);
        return null;
    }
}
async function getUsers(searchString) {
    try {
        const { data } = await db_postgres_1.default
            .from("users")
            .select("*")
            .or(`username.ilike.%${searchString}%,name.ilike.%${searchString}%`);
        return data;
    }
    catch (err) {
        console.log({ err });
        return null;
    }
}
const getMyData = async (id_user) => {
    try {
        const { data: followers, error: errorFollowers } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user", id_user)
            .eq("state", "accepted");
        if (errorFollowers)
            throw errorFollowers;
        const { data: following, error: errorFollowing } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user_follower", id_user)
            .eq("state", "accepted");
        if (errorFollowing)
            throw errorFollowing;
        const { data: posts, error: errorPost } = await db_postgres_1.default
            .from("posts")
            .select("*")
            .eq("id_user", id_user);
        if (errorPost)
            throw errorPost;
        return {
            followers: followers.length,
            following: following.length,
            posts,
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getMyData = getMyData;
const getUserData = async (id_user, id_user_follower) => {
    try {
        const { data: followers, error: errorFollowers } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user", id_user)
            .eq("state", "accepted");
        if (errorFollowers)
            throw errorFollowers;
        const { data: following, error: errorFollowing } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user_follower", id_user)
            .eq("state", "accepted");
        if (errorFollowing)
            throw errorFollowing;
        const { data: posts, error: errorPost } = await db_postgres_1.default
            .from("posts")
            .select("*")
            .eq("id_user", id_user);
        if (errorPost)
            throw errorPost;
        const { data: user, error: errorUser } = await db_postgres_1.default
            .from("users")
            .select("*")
            .eq("id_user", id_user)
            .single();
        if (errorUser)
            throw errorUser;
        const { data: isFollowing } = await db_postgres_1.default
            .from("followers")
            .select("*")
            .eq("id_user", id_user)
            .eq("id_user_follower", id_user_follower).single();
        return {
            followers: followers.length,
            following: following.length,
            posts,
            isFollowing,
            ...user,
        };
    }
    catch (error) {
        console.log(error);
        return null;
    }
};
exports.getUserData = getUserData;
const setToken = (payload) => {
    return jsonwebtoken_1.default.sign(payload, config_1.SECRET);
};
exports.setToken = setToken;
const verifyUser = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, config_1.SECRET);
    }
    catch (err) {
        return null;
    }
};
exports.verifyUser = verifyUser;
