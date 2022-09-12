import { Counter, CRUDInterface } from './types';

export class APICaller implements CRUDInterface {
  apiURL: string;

  constructor(apiURL: string) {
    this.apiURL = apiURL;
  }

  async create(name: string): Promise<boolean> {
    const body = JSON.stringify({ name });
    return await fetch(this.apiURL, { method: 'PUT', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }

  async read(): Promise<Counter[]> {
    return await fetch(this.apiURL, { method: 'GET' }).then(
      (r) => r.json() as Promise<Counter[]>
    );
  }

  async update(name: string, value: number): Promise<boolean> {
    const body = JSON.stringify({ name, value });
    return await fetch(this.apiURL, { method: 'POST', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }

  async delete(name: string): Promise<boolean> {
    const body = JSON.stringify({ name });
    return await fetch(this.apiURL, { method: 'DELETE', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }
}
