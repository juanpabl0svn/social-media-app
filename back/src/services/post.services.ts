import { Post } from "../db.mysql";

export async function getAllPosts() {
  try {
    const posts = await Post.findAll({ order: [["create_date", "DESC"]] });
    return posts;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getAllUserPosts(userId: any) {
  try {
    const posts = await Post.findAll({ where: { user_id: userId } });
    return posts;
  } catch (err) {
    console.error(err);
    return err;
  }
}
