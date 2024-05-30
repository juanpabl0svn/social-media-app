import { storage } from "../db.firebase";
import { Post, User } from "../db.mysql";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function getAllPosts() {
  try {
    // const postsData = []
    return await Post.findAll({
      order: [["create_date", "DESC"]],
      limit: 10,
    });
    // for (let post of posts){
    //   const user = await User.findOne({where: {id_user: post.toJSON().user_id}})
    //   postsData.push({
    //     username: user?.toJSON().username,
    //     imageSrc: post.toJSON().imageSrc,
    //     description: post.toJSON().description
    //   })
    // }
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getAllUserPosts(id_user: any) {
  try {
    return await Post.findAll({ where: { id_user } });
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function createNewPost(file: any, postData: any) {
  const data = {
    user_id: postData.user_id,
    description: postData.description,
    imageSrc: "",
  };
  try {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.originalname}`);
    await uploadBytes(storageRef, file.buffer, {
      contentType: file.mimetype,
    });
    const downloadURL = await getDownloadURL(storageRef);
    data.imageSrc = downloadURL;
    const newPost = await Post.create(data);
    return newPost.toJSON();
  } catch (err) {
    console.error(err);
    return;
  }
}
