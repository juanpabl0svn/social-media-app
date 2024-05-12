import { storage } from "../db.firebase";
import { Post, User } from "../db.mysql";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export async function getAllPosts() {
  try {
    const postsData = []
    const posts = await Post.findAll({ order: [["create_date", "DESC"]], limit: 10 });
    for (let post of posts){
      const user = await User.findOne({where: {id_user: post.toJSON().user_id}})
      postsData.push({
        username: user?.toJSON().username,
        imageSrc: post.toJSON().imageSrc,
        description: post.toJSON().description
      })
    }
    return postsData;
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

export async function createNewPost(file: any, postData: any) {
  const data = {
    user_id: postData.user_id,
    description: postData.description,
    imageSrc: "",
  };
  try {
    const storageRef = ref(storage, `posts/${Date.now()}_${file.originalname}`);
    const snapshot = await uploadBytes(storageRef,file.buffer, {contentType: file.mimetype});
    const downloadURL = await getDownloadURL(storageRef)
    data.imageSrc = downloadURL;
    const newPost = await Post.create(data);
    return newPost.toJSON()
  } catch (err) {
    console.error(err);
    return 
  }
}
