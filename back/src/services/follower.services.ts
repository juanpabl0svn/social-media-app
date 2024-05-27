import { Op } from "sequelize";
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
  try {
    const follows = await Follower.findAll({
      where: { [Op.or]: [
        { id_user: userId },
        { id_user_follower: userId }
      ] },
    });
    return follows;
  } catch (err) {
    console.error(err);
    return false;
  }
}
