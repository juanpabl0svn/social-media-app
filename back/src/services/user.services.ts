import { SALT, SECRET } from "../config";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import supabase from "../db.postgres";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string,
  birth_date: string
): Promise<Error | any> {
  password = await bcrypt.hash(password, +SALT);
  try {
    const { data, error } = await supabase
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
      console.log(error)
      return { error: error.details };

    }

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
  birth_date: string,
  password: string
) {
  try {


    const { data } = await supabase.from("users").select("*").eq("id_user", id_user).single();


    if (data?.username !== username) {
      const { data: usernameExists } = await supabase.from("users").select("*").eq("username", username).single();
      if (usernameExists) return false;
    }

    if (data?.password !== password) {
      console.log(password)
      password = await bcrypt.hash(password, +SALT);
    }

    const { data: newUser } = await supabase
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
      .eq("id_user", id_user)
      .eq("state", "accepted");

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
      .eq("id_user", id_user)
      .eq("state", "accepted");

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
