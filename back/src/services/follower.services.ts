import { Follower } from "../db.mysql";

export async function followReq(userReq: number, userToFollow: number) {
  try {
    await Follower.create({
      id_user: userToFollow,
      id_user_follower: userReq,
      request_update_date: Date.now(),
    });
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function getUserFollows(userId: number) {
  console.log(userId);
  return userId;
  // try {
  //   const follows = await Follower.findAll({
  //     where: { id_user: userId },
  //   });
  //   return follows;
  // } catch (err) {
  //   console.error(err);
  //   return false;
  // }
}
