export type TUserType = "super" | "admin" | "user";

export interface IUser {
  id?: string;
  username: string;
  email: string;
  avatar?: string;
  age: number;
  phone?: string;
  firstname: string;
  lastname: string;
  displayName: string;
  bio?: string;
  password: string;
  type: TUserType;
}
