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

export interface CRUDInterface {
  create: (name: string) => Promise<boolean>;
  read: () => Promise<Counter[]>;
  update: (name: string, value: number) => Promise<boolean>;
  delete: (name: string) => Promise<boolean>;
}

declare global {
  interface Window {
    db: CRUDInterface;
  }
}
