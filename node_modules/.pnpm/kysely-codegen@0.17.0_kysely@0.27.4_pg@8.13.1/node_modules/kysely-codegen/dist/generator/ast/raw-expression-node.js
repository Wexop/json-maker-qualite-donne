"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RawExpressionNode = void 0;
const node_type_1 = require("./node-type");
class RawExpressionNode {
    constructor(expression) {
        this.type = node_type_1.NodeType.RAW_EXPRESSION;
        this.expression = expression;
    }
}
exports.RawExpressionNode = RawExpressionNode;
//# sourceMappingURL=raw-expression-node.js.map