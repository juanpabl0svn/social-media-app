import { User } from "../db.mysql";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string
) {
  try {
    const createdUser = await User.create({
      username: username,
      name: name,
      email: email,
      password: password,
    });
    console.log(`user ${name} created with id ${createdUser}`);
    console.log(createdUser);
  } catch (err) {
    console.error(err);
  }
}

export async function logInUser(username: string, password: string) {
  try {
    const user = await User.findOne({
      where: { username: username, password: password },
    });
    if (user) {
      return user.dataValues
    }
  } catch (err) {
    console.error(err);
  }
}
