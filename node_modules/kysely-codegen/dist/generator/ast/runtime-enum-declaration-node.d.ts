import type { IdentifierStyle } from '../transformer/identifier-style';
import { LiteralNode } from './literal-node';
import { NodeType } from './node-type';
type RuntimeEnumMember = [key: string, value: LiteralNode<string>];
export declare class RuntimeEnumDeclarationNode {
    readonly members: RuntimeEnumMember[];
    name: string;
    readonly type = NodeType.RUNTIME_ENUM_DECLARATION;
    constructor(name: string, literals: string[], options?: {
        identifierStyle?: IdentifierStyle;
    });
}
export {};
