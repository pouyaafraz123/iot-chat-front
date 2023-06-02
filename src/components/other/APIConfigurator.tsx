import { AxiosError, AxiosInstance } from "axios";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import apiCaller, { IError, IServerResponse } from "../../api";

interface IAPIConfiguratorProps {
  axiosInstance?: AxiosInstance;
  onError?: (message: string) => void;
}

export function APIConfigurator({
                                  axiosInstance = apiCaller,
                                  onError = (error) => toast.error(error),
                                }: IAPIConfiguratorProps) {
  const { logout } = useAuth();
  const history = useNavigate();

  const errorHandler = async (error: AxiosError<IServerResponse<any>>) => {
    if (!error.response) {
      if (error.response !== "ERR_CANCELED") {
        // "ERR_CANCELED" happened if the file query or mutation has been canceled.
        // in this case we don't want to show an error message.
        onError("Unable to get server response. Please check your connection.");
      }
      return Promise.reject(error);
    }
    if (error?.response?.data?.errors) {
      const errorRes: IError | undefined = await error?.response?.data?.errors[0];

      /* console.log(error?.response?.data?.detail);
      if (error?.response?.data?.detail) {
        toast.error(error?.response?.data?.detail);
        return Promise.reject(error);
      }*/

      console.log(errorRes);

      onError(errorRes?.message || "Something went wrong!");
      if (errorRes?.status === 401) {
        logout();
      }
      if (errorRes?.status === 403) {
        history(-1);
      }

      const err = errorRes?.data;
      err?.forEach((item: { [key: string]: string }) => {
        for (const key in item) {
          onError(`${key}: ${item[key]}`);
        }
      });

      return Promise.reject(error);
    }
  };

  useEffect(() => {
    axiosInstance.interceptors.response.use(undefined, errorHandler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
