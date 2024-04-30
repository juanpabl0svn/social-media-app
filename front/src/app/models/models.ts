export interface IUSER {
  name: {
    first: string;
    last: string;
  };
  login: { uuid: string };
  picture: { large: string; medium: string; thumbnail: string };
  hasLiked: boolean;
}
