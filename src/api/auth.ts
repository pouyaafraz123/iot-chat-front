import apiCaller, { IResponse } from "./index.ts";
import { IUser } from "./user.ts";

export interface ILoginParam{
  username:string;
  password:string;
}

export function login(data:ILoginParam):Promise<IResponse<{user:IUser,token:string}>>{
  return apiCaller.post(``,{
    query:`
      query login($data: loginParam) {
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
    variables:data
  })
}
