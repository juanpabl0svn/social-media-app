import { SALT } from "../config";
import { User } from "../db.mysql";
import bcrypt from "bcrypt";
import { Op } from "sequelize";

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

export async function getUser(userId: number) {
  try {
    const user = await User.findOne({
      where: { id_user: userId },
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