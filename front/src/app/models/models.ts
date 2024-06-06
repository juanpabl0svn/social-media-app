export interface IUSER {}

export interface ICOMMENT {
  id: string;
  comment: string;
  image: string;
  users: {
    username: string;
  };
}

export interface IPOST {
  id_post: number;
  description: string;
  id_user: number;
  image_src: string;
  hasLiked: boolean;
  likes: number;
  users: {
    username: string;
  };
}
