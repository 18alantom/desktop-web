import { CounterManager } from './manager';
export interface Counter {
  name: string;
  value: number;
}

declare module 'vue' {
  interface ComponentCustomProperties {
    counterManager: CounterManager;
  }
}

export interface Database {
  create: (name: string) => boolean;
  read: () => Counter[];
  update: (name: string, value: number) => boolean;
  delete: (name: string) => boolean;
}

declare global {
  interface Window {
    db: Database;
  }
}
