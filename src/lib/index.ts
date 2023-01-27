import { Contacts } from "./modules/contacts";
import { Conversations } from "./modules/conversations";
import { buildClient } from "./client/build";



export class ChatwootClient {
  client: any;
  contacts: (accountId: string) => Contacts;
  conversations: (accountId: string) => Conversations;
  constructor(config: { host: string, apiVersion?: string, apiAccessToken: string }) {
    this.client = buildClient({config});
    this.contacts = this.getInstance(Contacts);
    this.conversations = this.getInstance(Conversations);
  }

  getInstance(Model) {
    return (accountId) => new Model({ accountId, client: this.client });
  }
}

