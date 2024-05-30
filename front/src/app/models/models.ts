export interface IUSER {}

export interface ICOMMENT {
  id: string;
  content: string;
  image: string;
  username: string;
}

export interface IPOST {
  id_post: number;
  description: string;
  id_user: number;
  imageSrc: string;
  hasLiked: boolean;
  likes: number;
}
