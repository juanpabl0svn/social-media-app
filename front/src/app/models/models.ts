export interface IUSER {
  name: {
    first: string;
    last: string;
  };
  login: { uuid: string };
  picture: { large: string };
}
