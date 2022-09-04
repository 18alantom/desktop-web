import { Counter, Database } from './types';

const baseURL = 'http://0.0.0.0:3030/api';

export class APIDatabase implements Database {
  async create(name: string): Promise<boolean> {
    const body = JSON.stringify({ name });
    return await fetch(baseURL, { method: 'PUT', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }

  async read(): Promise<Counter[]> {
    return await fetch(baseURL, { method: 'GET' }).then(
      (r) => r.json() as Promise<Counter[]>
    );
  }

  async update(name: string, value: number): Promise<boolean> {
    const body = JSON.stringify({ name, value });
    return await fetch(baseURL, { method: 'POST', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }

  async delete(name: string): Promise<boolean> {
    const body = JSON.stringify({ name });
    return await fetch(baseURL, { method: 'DELETE', body }).then(
      (r) => r.json() as Promise<boolean>
    );
  }
}
