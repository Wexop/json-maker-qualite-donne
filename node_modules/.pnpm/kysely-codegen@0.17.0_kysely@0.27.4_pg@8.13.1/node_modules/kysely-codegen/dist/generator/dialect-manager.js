"use strict";
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _DialectManager_options;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DialectManager = void 0;
const kysely_bun_sqlite_dialect_1 = require("./dialects/kysely-bun-sqlite/kysely-bun-sqlite-dialect");
const libsql_dialect_1 = require("./dialects/libsql/libsql-dialect");
const mssql_dialect_1 = require("./dialects/mssql/mssql-dialect");
const mysql_dialect_1 = require("./dialects/mysql/mysql-dialect");
const postgres_dialect_1 = require("./dialects/postgres/postgres-dialect");
const sqlite_dialect_1 = require("./dialects/sqlite/sqlite-dialect");
const worker_bun_sqlite_dialect_1 = require("./dialects/worker-bun-sqlite/worker-bun-sqlite-dialect");
/**
 * Returns a dialect instance for a pre-defined dialect name.
 */
class DialectManager {
    constructor(options) {
        _DialectManager_options.set(this, void 0);
        __classPrivateFieldSet(this, _DialectManager_options, options, "f");
    }
    getDialect(name) {
        switch (name) {
            case 'kysely-bun-sqlite':
                return new kysely_bun_sqlite_dialect_1.KyselyBunSqliteDialect();
            case 'libsql':
                return new libsql_dialect_1.LibsqlDialect();
            case 'mssql':
                return new mssql_dialect_1.MssqlDialect();
            case 'mysql':
                return new mysql_dialect_1.MysqlDialect();
            case 'postgres':
                return new postgres_dialect_1.PostgresDialect(__classPrivateFieldGet(this, _DialectManager_options, "f"));
            case 'bun-sqlite': // Legacy.
            case 'worker-bun-sqlite':
                return new worker_bun_sqlite_dialect_1.WorkerBunSqliteDialect();
            default:
                return new sqlite_dialect_1.SqliteDialect();
        }
    }
}
exports.DialectManager = DialectManager;
_DialectManager_options = new WeakMap();
//# sourceMappingURL=dialect-manager.js.map