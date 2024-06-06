import supabase from "../db.postgres";

export async function followReq(id_user: number, id_user_follower: number) {
  try {
    const { data } = await supabase
      .from("followers")
      .insert({
        id_user,
        id_user_follower,
      })
      .select();
    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function acceptFollowReq(id_follow: number) {
  try {
    const { data } = await supabase
      .from("followers")
      .update({ state: "accepted" })
      .eq("id_follow", id_follow)
      .select();

    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function rejectFollowReq(id_follow: number) {
  try {
    const { data } = await supabase
      .from("followers")
      .delete()
      .eq("id_follow", id_follow)
      .select();
    return data;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function getUserFollows(id_user: number) {
  try {
    const { data } = await supabase
      .from("followers")
      .select(
        `
      id_follow,
      id_user,
      id_user_follower,
      state,
      request_date,
      request_update_date,
      users (username, id_user)
    `
      )
      .eq("id_user", id_user);

    console.log({data});

    return data;
  } catch (err) {
    console.error(err);
    return false;
  }
}

export async function isFollowing(userId1: number, userId2: number) {
  try {
    const { data } = await supabase
      .from("followers")
      .select("*")
      .eq("id_user", userId1)
      .eq("id_user_follower", userId2);

    return data;
  } catch (err) {
    console.error("Error finding follower relationship:", err);
    throw err;
  }
}
