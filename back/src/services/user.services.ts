import { User } from "../db.mysql";

export async function registerUser(
  name: string,
  username: string,
  email: string,
  password: string
) {
  const createdUser = await User.create({
    username: username,
    name: name,
    email: email,
    password: password,
  });
  console.log(`user ${name} created with id ${createdUser}`);
  console.log(createdUser);
}
