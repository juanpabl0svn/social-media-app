import { storage } from "../db.firebase";
import { Post } from "../db.mysql";
import { ref, uploadBytes } from "firebase/storage";

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

export async function createNewPost(formData: any){
  const data = {
    user_id: formData.get('user_id'),
    description: formData.get('description'),
    imageSrc: '',
  }
  try{
    const storageRef = ref(storage, `posts`)
    uploadBytes(storageRef, formData.get('file')).then((snapshot)=>{
      console.log('uploaded file', snapshot)
    })
    
    // const newPost = await Post.create(data)
  }catch(err){
    console.error(err)
  }
}
