import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/auth.ts";

const useProfile = () => {
  return useQuery([getCurrentUser.name], () => getCurrentUser(), {
    refetchInterval: 60 * 1000 * 3,
    refetchIntervalInBackground: true,
    keepPreviousData: true,
    cacheTime: 0,
    staleTime: 0,
  });
};

export default useProfile;
