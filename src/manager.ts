import { ref, Ref } from 'vue';

interface Counter {
  name: string;
  value: number;
}

export class CounterManager {
  counters: Ref<Map<string, Counter>>;

  get list(): Counter[] {
    const list: Counter[] = [];
    for (const name of this.counters.value.keys()) {
      list.push(this.counters.value.get(name)!);
    }
    return list;
  }

  constructor() {
    this.counters = ref(new Map());
  }

  add(name: string) {
    if (!name || this.counters.value.has(name)) {
      return;
    }

    this.counters.value.set(name, { name, value: 0 });
  }

  increment(name: string) {
    const { value } = this.counters.value.get(name) ?? { value: 0 };
    this.counters.value.set(name, { name, value: value + 1 });
  }

  delete(name: string) {
    this.counters.value.delete(name);
  }

  async load() {
    for (const c of getDummyData()) {
      this.counters.value.set(c.name, c);
    }
  }
}

function getDummyData(): Counter[] {
  return [
    { name: 'counter-a', value: 3 },
    { name: 'counter-b', value: 7 },
  ];
}
