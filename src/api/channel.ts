import { IUser } from "./user.ts";
import apiCaller, {
  IPaginationParam,
  IPaginationTableList,
  IResponse,
} from "./index.ts";

export interface IChannelParam {
  name: string;
  description?: string;
  displayName?: string;
  image: string;
}

export interface IMUser {
  displayName: string;
  avatar?: string;
  id?: string;
}

export interface IChannel {
  id: string;
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

export function createChannel(data: IChannelParam): Promise<IResponse<any>> {
  return apiCaller.post(``, {
    query: `
      mutation createChannel($data: channelParam!) {
        createChannel(data: $data) {
          id
          name
          creator {
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
          description
          members {
            id
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
