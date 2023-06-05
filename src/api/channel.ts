import { IUser } from "./user.ts";
import apiCaller, {
  IPaginationParam,
  IPaginationTableList,
  IResponse,
} from "./index.ts";
import { useInfiniteQuery } from "@tanstack/react-query";
import { calculateMaxPage } from "../utils/pagination";

export interface IChannelParam {
  name: string;
  description?: string;
  displayName?: string;
  image: string;
}

export interface IMUser {
  displayName: string;
  avatar?: string;
  _id?: string;
}

export interface IChannel {
  _id: string;
  name: string;
  creator: IUser;
  description?: string;
  members: IMUser[];
  displayName: string;
  image: string;
}

export interface IGetChannels {
  getChannels: IPaginationTableList<IChannel>;
}

export interface IGetChannel {
  getChannel: IChannel;
}

export function getChannels({
  query,
  page,
  per_page,
}: IPaginationParam): Promise<IResponse<IGetChannels>> {
  return apiCaller.post(``, {
    query: `
      {
        getChannels {
          list {
            _id
            name
            creator {
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
            description
            members {
              _id
              displayName
              avatar
            }
            displayName
            image
          }
          count
          page
          per_page
        }
      }
    `,
  });
}

export function useAllChannels() {
  return useInfiniteQuery<IGetChannels>(
    [getChannels.name],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParam = { page: pageParam };
      const response = await getChannels({
        ...params,
      });
      return response.data.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        let maxPage = calculateMaxPage(
          lastPage.getChannels.count,
          lastPage.getChannels.per_page
        );
        return allPages.length < maxPage ? allPages.length + 1 : undefined;
      },
    }
  );
}

export function createChannel(data: IChannelParam): Promise<IResponse<any>> {
  return apiCaller.post(``, {
    query: `
      mutation createChannel($data: channelParam!) {
        createChannel(data: $data) {
          _id
          name
          creator {
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
          description
          members {
            _id
            displayName
            avatar
          }
          displayName
          image
        }
      }
    `,
    variables: { data },
  });
}

export function getChannel(id: string): Promise<IResponse<IGetChannel>> {
  return apiCaller.post(``, {
    query: `
      query getChannel {
        getChannel(id:"${id}") {
          _id
          name
          creator {
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
          description
          members {
            _id
            displayName
            avatar
          }
          displayName
          image
        }
      }
    `,
  });
}
