import axios, { AxiosResponse } from "axios";

export const BASE_URL = "https://iot-chat-server.iran.liara.run/graphql";
//export const BASE_URL = "http://localhost:8080/graphql";

const apiCaller = axios.create({
  baseURL: BASE_URL,
});

export interface IError {
  message: string,
  status: number,
  data: { [key: string]: string }[]
}


export interface IServerResponse<T> {
  detail?: string;
  errors?: IError[];
  data?: T;
}

export interface IResponse<T> extends AxiosResponse {
  data: T;
  detail: string;
}

export interface IPagination {
  count: number;
  page: number;
  per_page: string;
}

export interface IPaginationParams {
  page: number;
  per_page?: number;
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
