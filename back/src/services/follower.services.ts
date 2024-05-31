import { Follower, User } from "../db.mysql";

export async function followReq(id_user: number, id_user_follower: number) {
  try {
    return await Follower.create({
      id_user,
      id_user_follower,
      request_update_date: Date.now(),
    });
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function acceptFollowReq(id_follow: number) {
  try {
    const follow = await Follower.findOne({
      where: { id_follow },
    });
    follow?.set({ state: "accepted" });
    return await follow?.save();
  } catch (err) {
    console.error(err);
    return null;
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

export async function getUserFollows(id_user: number) {
  try {
    return await Follower.findAll({
      where: { id_user },
      include: {
        model: User,
        attributes: ["username", "id_user"],
      },
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
        id_user: userId2,
        id_user_follower: userId1,
      },
    });
  } catch (err) {
    console.error("Error finding follower relationship:", err);
    throw err;
  }
}
