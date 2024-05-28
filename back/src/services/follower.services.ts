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

export async function acceptFollowReq(followId: number) {
  try {
    const follow = await Follower.findOne({
      where: { id_follow: followId },
    });
    follow?.set({ state: "accepted" });
    const savedFollow = await follow?.save();
    return savedFollow;
  } catch (err) {
    console.error(err);
    return;
  }
}

export async function rejectFollowReq(followId: number) {
  try {
    const follow = await Follower.findOne({
      where: { id_follow: followId },
    });
    await follow?.destroy();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getUserFollows(userId: number) {
  try {
    const follows = await Follower.findAll({
      where: { [Op.or]: [{ id_user: userId }, { id_user_follower: userId }] },
    });
    return follows;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function isFollowing(userId1: number, userId2: number) {
  try {
    const follow = await Follower.findOne({
      where: {
        state: "accepted",
        [Op.or]: [
          {
            [Op.and]: [{ id_user: userId1 }, { id_user_follower: userId2 }],
          },
          {
            [Op.and]: [{ id_user: userId2 }, { id_user_follower: userId1 }],
          },
        ],
      },
    });
    return follow !== null;
  } catch (err) {
    console.error("Error finding follower relationship:", err);
    throw err;
  }
}
