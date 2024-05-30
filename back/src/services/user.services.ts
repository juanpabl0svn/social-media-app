import { SALT, SECRET } from "../config";
import { Follower, Post, User } from "../db.mysql";
import bcrypt from "bcrypt";
import { Op, where } from "sequelize";
import jwt from "jsonwebtoken";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string,
  date: Date
): Promise<Error | any> {
  password = await bcrypt.hash(password, +SALT);
  try {
    const createdUser = await User.create({
      username: username,
      name: name,
      email: email,
      password: password,
      birth_date: date,
    });
    return createdUser.toJSON();
  } catch (err) {
    return err as Error;
  }
}

export async function logInUser(
  username: string,
  password: string
): Promise<Error | any> {
  try {
    const user = await User.findOne({
      where: { username },
    });

    if (!user) throw new Error("User not found");
    const isValidPassword = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    if (!isValidPassword) throw new Error("Invalid password");

    return user.toJSON();
  } catch (err) {
    return err as Error;
  }
}

export async function updateProfile(
  id_user: number,
  name: string,
  username: string,
  email: string,
  date: Date
) {
  try {
    const user = await User.findOne({
      where: { id_user },
    });

    user?.set({
      name: name,
      username: username,
      email: email,
      date: date,
    });
    const savedUser = await user?.save();
    return savedUser;
  } catch (err) {
    console.error(err);
    return new Error(`${err}`);
  }
}

export async function getUser(id_user: number) {
  try {
    const user = await User.findOne({
      where: { id_user },
    });
    return user;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function getUsers(searchString: string) {
  try {
    const users = await User.findAll({
      where: {
        [Op.or]: [
          { username: { [Op.iLike]: `%${searchString}%` } },
          { name: { [Op.iLike]: `%${searchString}%` } },
        ],
      },
    });
    return users;
  } catch (err) {
    return `${searchString} failed`;
  }
}

export const getMyData = async (id_user: number) => {
  try {
    const followers = await Follower.findAll({ where: { id_user } });
    const following = await Follower.findAll({
      where: { id_user_follower: id_user },
    });
    const posts = await Post.findAll({ where: { id_user } });

    return {
      followers: followers.length,
      following: following.length,
      posts,
    };
  } catch (error) {
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
