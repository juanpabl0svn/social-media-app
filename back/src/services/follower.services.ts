import { Op } from "sequelize";
import { Follower } from "../db.mysql";

export async function followReq(userReq: number, userToFollow: number) {
  try {
    return await Follower.create({
      id_user: userToFollow,
      id_user_follower: userReq,
      request_update_date: Date.now(),
    });
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
    return await follow?.save();
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
    return await follow?.destroy();
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getUserFollows(userId: number) {
  try {
    return await Follower.findAll({
      where: { [Op.or]: [{ id_user: userId }, { id_user_follower: userId }] },
      include: ["user", "userFollower"],
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function isFollowing(userId1: number, userId2: number) {
  try {
    return await Follower.findOne({
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
  } catch (err) {
    console.error("Error finding follower relationship:", err);
    throw err;
  }
}
