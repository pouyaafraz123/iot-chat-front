import apiCaller, { IResponse } from "./index.ts";
import { IUser } from "./user.ts";

export interface ILoginParam {
  username: string;
  password: string;
}

export interface ISignupParam {
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
}

export interface ILogin {
  login: { user: IUser; token: string };
}

export interface ISignup {
  signup: IUser;
}

export function login(data: ILoginParam): Promise<IResponse<ILogin>> {
  return apiCaller.post(``, {
    query: `
      query login($data: loginParam!) {
        login(data: $data) {
          user {
            _id
            username
            email
            avatar
            age
            phone
            firstname
            lastname
            displayName
            bio
            type
          }
          token
        }
      }
    `,
    variables: { data },
  });
}

export function signup(data: ISignupParam): Promise<IResponse<ISignup>> {
  return apiCaller.post(``, {
    query: `
      mutation signup($data:signupParam!){
        signup(data:$data){
          _id
          username
          email
          avatar
          age
          phone
          firstname
          lastname
          displayName
          bio
          type
        }
      }
    `,
    variables: { data },
  });
}

export function getCurrentUser(): Promise<
  IResponse<{ getCurrentUser: { _id: string } }>
> {
  return apiCaller.post(``, {
    query: `
      {
        getCurrentUser{
          _id
        }
      }
    `,
  });
}
