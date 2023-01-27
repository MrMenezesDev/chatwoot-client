export interface ChatwootMessagePayload {
  id: number;
  message_type: "incoming", "outcoming",
  content: string,
  created_at: Date,
  content_type?: string,
  content_attributes: { [key: string]: unknown },
  source_id: null,
  sender: {
    id: number,
    name: string,
    avatar: string,
    type: string
  },
  inbox: {
    id: number,
    name: string
  },
  conversation: {
    additional_attributes: null,
    channel: string,
    id: number,
    inbox_id: number,
    status: string,
    agent_last_seen_at: number,
    contact_last_seen_at: number,
    timestamp: 0,
    meta: Meta;
  },
  account: {
    id: 1,
    name: string,
  },
  event: string,
}

export interface AdditionalAttributes {
  [key: string]: unknown;
}

export interface ContactInbox {
  contact_id?: number | string;
  inbox_id?:  number | string;
  source_id?:  number | string;
  id?: number;
  createdAt?: Date;
  updatedAt?: Date;
  hmacVerified?: boolean;
  pubsubToken?: string;
}

export interface Message {
  id?: number;
  content?: string;
  accountID?: number;
  inboxID?: number;
  conversationID?: number;
  messageType?: number;
  createdAt?: number;
  updatedAt?: Date;
  private?: boolean;
  status?: string;
  sourceID?: null;
  contentType?: string;
  contentAttributes?: AdditionalAttributes;
  senderType?: string;
  senderID?: number;
  externalSourceIDS?: AdditionalAttributes;
  additionalAttributes?: AdditionalAttributes;
  conversation?: Conversation;
  sender?: MessageSender;
}

export interface Conversation {
  assigneeID?: null;
}

export interface MessageSender {
  id?: number;
  name?: string;
  available_name?: string;
  avatar_uRL?: string;
  type?: string;
  availability_status?: null;
  thumbnail?: string;
}

export interface Meta {
  sender?: MetaSender;
  assignee?: null;
  team?: null;
  hmac_verified?: boolean;
}

export interface MetaSender {
  additional_attributes?: AdditionalAttributes;
  custom_attributes?: AdditionalAttributes;
  email?: null;
  id?: number;
  identifier?: null;
  name?: string;
  phone_number?: string;
  thumbnail?: string;
  type?: string;
}


export interface MessageMedia {
  /** MIME type of the attachment */
  mimetype: string
  /** Base64-encoded data of the file */
  data: string
  /** Document file name. Value can be null */
  filename?: string | null
  /** Document file size in bytes. Value can be null. */
  filesize?: number | null

  /**
   * @param {string} mimetype MIME type of the attachment
   * @param {string} data Base64-encoded data of the file
   * @param {?string} filename Document file name. Value can be null
   * @param {?number} filesize Document file size in bytes. Value can be null.
   **/
}

export interface IMessageParam {
  content?: string;
  message_type: "outgoing" | "incoming";
  private?: boolean;
  content_attributes?: { [key: string]: any };
  content_type?: "input_email" | "cards" | "input_select" | "form" | "article";
}