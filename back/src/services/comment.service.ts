import { Comment, Post } from "../db.mysql";
import { isFollowing } from "./follower.services";

export async function postComment(
  id_user: number,
  id_post: number,
  commentString: string
) {
  try {
    const userCanComment = canComment(id_post, id_user);
    if (!userCanComment) return "Cant comment";
    const comment = await Comment.create({
      id_user: id_user,
      id_post: id_post,
      comment: commentString,
    });
    return comment;
  } catch (err) {
    console.log("Error posting comment ", err);
    throw err;
  }
}

export async function getPostComments(id_post: number) {
  try {
    const comments = await Comment.findAll({
      where: { id_post: id_post },
    });
    return comments;
  } catch (err) {
    console.error("Error getting post comments ", err);
    throw err;
  }
}

export async function canComment(id_post: number, id_user: number) {
  try {
    const post = await Post.findOne({
      where: { id_post: id_post },
    });
    if (!post) {
      return false;
    }

    const postAuthorId = post.user_id;

    const isFollowingRes = await isFollowing(postAuthorId, id_user);

    return isFollowingRes;
  } catch (err) {
    console.error("Error validating if can comment ", err);
    throw err;
  }
}
