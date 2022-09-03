class Database {
  constructor() {
    this.counters = new Map();

    for (const data of getDummyData()) {
      this.counters.set(data.name, data);
    }
  }

  async create(name) {
    console.log('create', name);
    this.counters.set(name, { name, value: 0 });
    return true;
  }

  async read() {
    const list = [];
    console.log('read');
    for (const name of this.counters.keys()) {
      list.push(this.counters.get(name));
    }

    return list;
  }

  async update(name, value) {
    console.log('update', name, value);
    this.counters.set(name, { name, value });
    return true;
  }

  async delete(name) {
    console.log('delete', name);
    this.counters.delete(name);
    return true;
  }
}

function getDummyData() {
  return [
    { name: 'counter-a', value: 3 },
    { name: 'counter-b', value: 7 },
  ];
}

module.exports = { Database };
