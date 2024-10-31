"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RuntimeEnumDeclarationNode = void 0;
const symbol_collection_1 = require("../transformer/symbol-collection");
const literal_node_1 = require("./literal-node");
const node_type_1 = require("./node-type");
class RuntimeEnumDeclarationNode {
    constructor(name, literals, options) {
        this.type = node_type_1.NodeType.RUNTIME_ENUM_DECLARATION;
        this.members = [];
        this.name = name;
        const symbolCollection = new symbol_collection_1.SymbolCollection({
            entries: literals.map((literal) => [
                literal,
                {
                    node: new literal_node_1.LiteralNode(literal),
                    type: symbol_collection_1.SymbolType.RUNTIME_ENUM_MEMBER,
                },
            ]),
            identifierStyle: options?.identifierStyle,
        });
        for (const { id, symbol } of symbolCollection.entries()) {
            if (symbol.type !== symbol_collection_1.SymbolType.RUNTIME_ENUM_MEMBER) {
                continue;
            }
            this.members.push([id, symbol.node]);
        }
    }
}
exports.RuntimeEnumDeclarationNode = RuntimeEnumDeclarationNode;
//# sourceMappingURL=runtime-enum-declaration-node.js.map