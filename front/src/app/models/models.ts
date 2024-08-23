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
  image_url: string;
  hasLiked: boolean;
  likes_count: number;
  likedByUser: boolean
  users: IUSER
}


export interface IUSER {
  id_user: number;
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  birth_date: string;
  image: string;
  created_at: string;
  updated_at: string;
}
