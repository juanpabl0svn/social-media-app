export interface IUSER {}

export interface ICOMMENT {
  id: string;
  content: string;
  image: string;
  username: string;
}

export interface IPOST {
  id_post: number;
  name: {
    first: string;
    last: string;
  };
  login: { uuid: string; username: string };
  picture: { large: string; medium: string; thumbnail: string };
  gender: string;
  hasLiked: boolean;
  likes: number;
  email: string;
  comments: ICOMMENT[];
}
