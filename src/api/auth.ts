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

export function login(
  data: ILoginParam
): Promise<IResponse<{ user: IUser; token: string }>> {
  return apiCaller.post(``, {
    query: `
      query login($data: loginParam!) {
        login(data: $data) {
          user {
            id
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

export function signup(data: ISignupParam): Promise<IResponse<IUser>> {
  return apiCaller.post(``, {
    query: `
      mutation signup($data:signupParam!){
        signup(data:$data){
          id
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
