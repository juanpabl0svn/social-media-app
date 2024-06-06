import { SALT, SECRET } from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../db.postgres";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string,
  date: string
): Promise<Error | any> {
  password = await bcrypt.hash(password, +SALT);
  try {
    const { data } = await supabase
      .from("users")
      .insert({
        username: username,
        name: name,
        email: email,
        password: password,
        birth_date: date,
      })
      .select();

    return data;
  } catch (err) {
    return err as Error;
  }
}

export async function logInUser(
  username: string,
  password: string
): Promise<Error | any> {
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("username", username)
      .single();

    if (!data) return null;

    const isValidPassword = await bcrypt.compare(password, data.password);

    if (!isValidPassword) return null;

    return data;
  } catch (err) {
    return err as Error;
  }
}

export async function updateProfile(
  id_user: number,
  name: string,
  username: string,
  email: string,
  date: string
) {
  try {
    await supabase
      .from("users")
      .update({
        name,
        username,
        email,
        birth_date: date,
      })
      .eq("id_user", id_user);

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getUser(id_user: number) {
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .eq("id_user", id_user)
      .single();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function getUsers(searchString: string) {
  try {
    const { data } = await supabase
      .from("users")
      .select("*")
      .or(`username.ilike.%${searchString}%,name.ilike.%${searchString}%`);

    return data;
  } catch (err) {
    console.log({ err });
    return null;
  }
}

export const getMyData = async (id_user: number) => {
  try {
    const { data: followers, error: errorFollowers } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user", id_user);

    if (errorFollowers) throw errorFollowers;

    const { data: following, error: errorFollowing } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user_follower", id_user)
      .eq("state", "accepted");

    if (errorFollowing) throw errorFollowing;

    const { data: posts, error: errorPost } = await supabase
      .from("posts")
      .select("*")
      .eq("id_user", id_user);

    if (errorPost) throw errorPost;

    return {
      followers: followers.length,
      following: following.length,
      posts,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getUserData = async (
  id_user: number,
  id_user_follower: number
) => {
  try {
    const { data: followers, error: errorFollowers } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user", id_user);

    if (errorFollowers) throw errorFollowers;

    const { data: following, error: errorFollowing } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user_follower", id_user);

    if (errorFollowing) throw errorFollowing;

    const { data: posts, error: errorPost } = await supabase
      .from("posts")
      .select("*")
      .eq("id_user", id_user);

    if (errorPost) throw errorPost;

    const { data: user, error: errorUser } = await supabase
      .from("users")
      .select("*")
      .eq("id_user", id_user)
      .single();
    if (errorUser) throw errorUser;

    const { data: isFollowing } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user", id_user)
      .eq("id_user_follower", id_user_follower);

    return {
      followers: followers.length,
      following: following.length,
      posts,
      isFollowing,
      ...user,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const setToken = (payload: any) => {
  return jwt.sign(payload, SECRET);
};

export const verifyUser = (token: string) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (err) {
    return null;
  }
};
