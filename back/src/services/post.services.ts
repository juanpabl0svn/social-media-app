import { storage } from "../db.firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import supabase from "../db.postgres";

export async function getAllPosts() {
  try {
    const { data } = await supabase.from("posts").select(`
    id_post,
    image_src,
    description,
    id_user,
    users (
      username
    )
  `);

    return data;
  } catch (err) {
    console.error(err);
    return err;
  }
}

export async function getAllUserPosts(id_user: any) {
  try {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("id_user", id_user);
    return data;
  } catch (err) {
    console.error(err);
    return null;
  }
}

export async function createNewPost(
  file: any,
  postData: { id_user: number; description: string }
) {
  const data = {
    id_user: postData.id_user,
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

    const { data: post } = await supabase
      .from("posts")
      .insert({
        id_user: data.id_user,
        description: data.description,
        image_src: data.imageSrc,
      })
      .select();

    return post;
  } catch (err) {
    console.error(err);
    return;
  }
}
