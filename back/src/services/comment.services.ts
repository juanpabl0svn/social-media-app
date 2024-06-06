import supabase from "../db.postgres";
import { isFollowing } from "./follower.services";

export async function postComment(
  id_user: number,
  id_post: number,
  comment: string
) {
  try {
    const userCanComment = await canComment(id_post, id_user);
    console.log(userCanComment);

    if (!userCanComment) return null;

    const { data } = await supabase
      .from("comments")
      .insert({
        id_user,
        id_post,
        comment,
      })
      .select();

    return data;
  } catch (err) {
    console.log("Error posting comment ", err);
    return null;
  }
}

export async function getPostComments(id_post: number) {
  try {
    const { data } = await supabase
      .from("comments")
      .select(
        `
      id_comment,
      id_user,
      id_post,
      comment,
      comment_date,
      users!inner (username)
    `
      )
      .eq("id_post", id_post);

    return data;
  } catch (err) {
    console.error("Error getting post comments ", err);
    throw err;
  }
}

export async function canComment(id_post: number, id_user: number) {
  try {
    const { data: post } = await supabase
      .from("posts")
      .select("*")
      .eq("id_post", id_post)
      .single();
      
    if (!post) {
      return false;
    }

    if (post.id_user == id_user) return true;

    return await isFollowing(post.id_user, id_user);
  } catch (err) {
    console.error("Error validating if can comment ", err);
    throw err;
  }
}
