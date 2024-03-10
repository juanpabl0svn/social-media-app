export interface User {
  name: { title: string; first: string; last: string };
  picture: { large: string; medium: string; thumbnail: string };
  login: { username: string; password: string; uuid: string };
  hasStories: boolean;
}
