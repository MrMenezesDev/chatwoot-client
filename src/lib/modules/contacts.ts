import { Base } from "./model";

interface IContact {
  inbox_id: number,
  name: string,
  email?: string,
  phone_number: string,
  avatar_url?: string,
  identifier: string,
  custom_attributes?: {
    [key: string]: any
  }
}

export class Contacts extends Base<IContact> {
  constructor({
    client,
    accountId
  }) {
    super({ client, path: 'contacts', accountId });
  }

  get(page = 1, sortAttr = 'name') {
    return this.client.get(`${this.path}?page=${page}&sort=${sortAttr}`);
  }

  getConversationsByContactId(contactID) {
    return this.client.get(`${this.path}/${contactID}/conversations`);
  }

  search(q, page = 1, sort = 'name'): Promise<any> {
    return this.client.get(`${this.path}/search?q=${q}&page=${page}&sort=${sort}`);
  }

  getLabels(contactID) {
    return this.client.get(`${this.path}/${contactID}/labels`);
  }

  updateLabels(contactID, labels) {
    return this.client.post(`${this.path}/${contactID}/labels`, { labels });
  }

}

