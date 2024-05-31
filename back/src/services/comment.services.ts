import { Comment, Post, User } from "../db.mysql";
import { isFollowing } from "./follower.services";

export async function postComment(
  id_user: number,
  id_post: number,
  comment: string
) {
  try {
    console.log(id_post, id_user, comment);
    const userCanComment = await canComment(id_post, id_user);

    if (!userCanComment) return null;

    console.log("se fue mi papa");

    return await Comment.create({
      id_user,
      id_post,
      comment,
    });
  } catch (err) {
    console.log("Error posting comment ", err);
    return null;
  }
}

export async function getPostComments(id_post: number) {
  try {
    return await Comment.findAll({
      where: { id_post },
      include: {
        model: User,
        attributes: ["username"],
      },
    });
  } catch (err) {
    console.error("Error getting post comments ", err);
    throw err;
  }
}

export async function canComment(id_post: number, id_user: number) {
  try {
    const post: any = await Post.findOne({
      where: { id_post },
    });

    if (!post) {
      return false;
    }

    if (post.id_user === id_user) return true;


    return await isFollowing(post.id_user, id_user);
  } catch (err) {
    console.error("Error validating if can comment ", err);
    throw err;
  }
}
