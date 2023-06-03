import axios, { AxiosResponse } from "axios";

export const BASE_URL = "https://iot-chat-server.iran.liara.run/graphql";
// export const BASE_URL = "http://localhost:8080/graphql";

const apiCaller = axios.create({
  baseURL: BASE_URL,
});

export interface IError {
  message: string,
  status: number,
  data: { [key: string]: string }[]
}




export interface IResponse<T> extends AxiosResponse {
  errors?: IError[];
  data: {data: T};
}

export interface IPagination {
  count: number;
  page: number;
  per_page: string;
}

export interface IPaginationParam {
  page: number;
  per_page?: number;
  query?:string;
}

export interface IPaginationTableList<T> extends IPagination {
  data: T[];
}

export const setAxiosToken = (token: string | null): void => {
  if (token === null) {
    delete apiCaller.defaults.headers.common["Authorization"];
    return;
  }

  apiCaller.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiCaller;
