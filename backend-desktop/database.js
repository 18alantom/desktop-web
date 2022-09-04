class Database {
  constructor(dbFile) {
    this.db = require('better-sqlite3')(dbFile ?? ':memory:', {
      verbose: console.log,
    });

    this.db.prepare(
      `create table if not exists counters 
        (name text primary key,
        value integer default 0)`
    ).run();
  }

  async create(name) {
    return !!this.db
      .prepare('insert into counters (name, value) values (?, 0)')
      .run(name);
  }

  async read() {
    return this.db.prepare('select * from counters').all();
  }

  async update(name, value) {
    return !!this.db
      .prepare('update counters set value = ? where name = ?')
      .run(value, name);
  }

  async delete(name) {
    return !!this.db.prepare('delete from counters where name = ?').run(name);
  }
}

module.exports = { Database };
