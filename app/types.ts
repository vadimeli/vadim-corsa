interface IChatBase {
  id: string;
  contactName: string;
  contactImage: string;
}

export interface IChatPreview extends IChatBase {
  lastMessage: string;
  lastMessageTimestamp: string;
}

export interface IChat extends IChatBase {
  messages: IMessage[];
}

export interface IMessage {
  id: string;
  content: string;
  sender: MessageSenderType;
  timestamp: string;
}

export type MessageSenderType = "contact" | "user";

export interface IChatsRequest {
  page: number;
  pageSize: number;
}

export interface IChatsResponse {
  chats: IChatPreview[];
  meta: IChatResponseMeta;
}

export interface IChatResponseMeta {
  totalChats: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
