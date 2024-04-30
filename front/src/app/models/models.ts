export interface IUSER {
  name: {
    first: string;
    last: string;
  };
  login: { uuid: string };
  picture: { large: string; medium: string; thumbnail: string };
  hasLiked: boolean;
}

export interface ICOMMENT {
  id: string;
  content: string;
  image: string;
  username: string;
}

export interface IPOST {
  name: {
    first: string;
    last: string;
  };
  login: { uuid: string; username: string };
  picture: { large: string; medium: string; thumbnail: string };
  gender: string;
  hasLiked: boolean;
  email: string;
  comments: ICOMMENT[];
}
