import { AxiosInstance } from "axios";

export class Base<T> {
  client: AxiosInstance;
  path: string;
  constructor({
    client,
    path,
    accountScoped = true,
    accountId
  }) {
    this.client = client;
    this.path = accountScoped ? `/accounts/${accountId}/${path}` : `/${path}`;
  }

  async show(id): Promise<T> {
    return this.client.get<any, T>(`${this.path}/${id}`);
  }

  public create(data: Omit<T, "id">) {
    return this.client.post(this.path, data);
  }

  update(id, data: T): Promise<T> {
    return this.client.patch(`${this.path}/${id}`, data);
  }

  delete(id) {
    return this.client.delete(`${this.path}/${id}`);
  }
}

