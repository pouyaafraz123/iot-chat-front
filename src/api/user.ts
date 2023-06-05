import apiCaller, { IResponse } from "./index.ts";

export type TUserType = "super" | "admin" | "user";

export interface IUser {
  _id?: string;
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

export interface IGetUser {
  getUser: IUser;
}

export function getUser(id: string): Promise<IResponse<IGetUser>> {
  return apiCaller.post(``, {
    query: `
        {
          getUser(id:"${id}"){
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
  });
}

export interface IUserParam {
  username: string;
  email: string;
  avatar?: string;
  age: number;
  phone?: string;
  firstname: string;
  lastname: string;
  displayName: string;
  bio?: string;
  type?: TUserType;
  password: string;
}

export function updateUser(
  id: string,
  data: IUserParam
): Promise<IResponse<any>> {
  return apiCaller.post(``, {
    query: `
      mutation updateUser($data:userParam!){
        updateUser(id:"${id}",data:$data){
          _id
        }
      }
    `,
    variables: { data },
  });
}

export function deleteUser(id: string): Promise<IResponse<any>> {
  return apiCaller.post(``, {
    query: `
      mutation {
        deleteUser(id: "${id}")
      }
    `,
  });
}
