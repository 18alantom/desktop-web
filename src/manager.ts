import { ref, Ref } from 'vue';
import { Counter, CRUDInterface } from './types';

export class CounterManager {
  counters: Ref<Map<string, Counter>>;
  db: CRUDInterface;

  constructor(db: CRUDInterface) {
    this.db = db;
    this.counters = ref(new Map());
  }

  get list(): Counter[] {
    const list: Counter[] = [];
    for (const name of this.counters.value.keys()) {
      list.push(this.counters.value.get(name)!);
    }

    return list;
  }

  async add(name: string) {
    if (!name || this.counters.value.has(name)) {
      return;
    }

    const success = await this.db.create(name);
    if (success) {
      this.counters.value.set(name, { name, value: 0 });
    }
  }

  async increment(name: string) {
    const { value } = this.counters.value.get(name) ?? { value: 0 };

    const success = await this.db.update(name, value + 1);
    if (success) {
      this.counters.value.set(name, { name, value: value + 1 });
    }
  }

  async delete(name: string) {
    const success = await this.db.delete(name);
    if (success) {
      this.counters.value.delete(name);
    }
  }

  async load() {
    const counters = await this.db.read();
    for (const c of counters) {
      this.counters.value.set(c.name, c);
    }
  }
}
