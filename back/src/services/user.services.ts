import { SALT } from "../config";
import { User } from "../db.mysql";
import bcrypt from "bcrypt";
import { IUSER } from "../model/types";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string,
  date: Date
): Promise<Error | IUSER> {
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
): Promise<Error | IUSER> {
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
