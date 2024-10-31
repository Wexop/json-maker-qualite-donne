"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LibsqlIntrospectorDialect = void 0;
const dialect_1 = require("../../dialect");
const libsql_introspector_1 = require("./libsql-introspector");
class LibsqlIntrospectorDialect extends dialect_1.IntrospectorDialect {
    constructor() {
        super(...arguments);
        this.introspector = new libsql_introspector_1.LibsqlIntrospector();
    }
    async createKyselyDialect(options) {
        const { LibsqlDialect: KyselyLibsqlDialect } = await Promise.resolve().then(() => __importStar(require('@libsql/kysely-libsql')));
        // LibSQL URLs are of the form `libsql://token@host:port/db`:
        const url = new URL(options.connectionString);
        if (url.username) {
            // The token takes the place of the username in the url:
            const token = url.username;
            // Remove the token from the url to get a "normal" connection string:
            url.username = '';
            return new KyselyLibsqlDialect({ authToken: token, url: url.toString() });
        }
        return new KyselyLibsqlDialect({ url: options.connectionString });
    }
}
exports.LibsqlIntrospectorDialect = LibsqlIntrospectorDialect;
//# sourceMappingURL=libsql-dialect.js.map