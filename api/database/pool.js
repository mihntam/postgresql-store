const { Pool } = require("pg");

class PoolClass {
  _pool = null;

  connect(option) {
    this._pool = new Pool(option);
    return this._pool.query("SELECT DATABASE ;");
  }

  query(sql, values) {
    return this._pool.query(sql, values);
  }

  close() {
    return this._pool.end();
  }
}

module.exports = new PoolClass();
