import type { AliasDeclarationNode } from '../ast/alias-declaration-node';
import type { ArrayExpressionNode } from '../ast/array-expression-node';
import type { ExportStatementNode } from '../ast/export-statement-node';
import type { ExpressionNode } from '../ast/expression-node';
import type { ExtendsClauseNode } from '../ast/extends-clause-node';
import type { GenericExpressionNode } from '../ast/generic-expression-node';
import type { IdentifierNode } from '../ast/identifier-node';
import type { ImportClauseNode } from '../ast/import-clause-node';
import type { ImportStatementNode } from '../ast/import-statement-node';
import type { InferClauseNode } from '../ast/infer-clause-node';
import type { InterfaceDeclarationNode } from '../ast/interface-declaration-node';
import type { LiteralNode } from '../ast/literal-node';
import type { MappedTypeNode } from '../ast/mapped-type-node';
import type { ObjectExpressionNode } from '../ast/object-expression-node';
import type { PropertyNode } from '../ast/property-node';
import type { RawExpressionNode } from '../ast/raw-expression-node';
import type { RuntimeEnumDeclarationNode } from '../ast/runtime-enum-declaration-node';
import type { StatementNode } from '../ast/statement-node';
import type { UnionExpressionNode } from '../ast/union-expression-node';
import { RuntimeEnumsStyle } from './runtime-enums-style';
type SerializerOptions = {
    camelCase?: boolean;
    runtimeEnumsStyle?: RuntimeEnumsStyle;
    singular?: boolean;
    typeOnlyImports?: boolean;
};
/**
 * Creates a TypeScript output string from a codegen AST.
 */
export declare class Serializer {
    readonly camelCase: boolean;
    readonly runtimeEnumsStyle?: RuntimeEnumsStyle;
    readonly singular: boolean;
    readonly typeOnlyImports: boolean;
    constructor(options?: SerializerOptions);
    serializeAliasDeclaration(node: AliasDeclarationNode): string;
    serializeArrayExpression(node: ArrayExpressionNode): string;
    serializeExportStatement(node: ExportStatementNode): string;
    serializeExpression(node: ExpressionNode): string;
    serializeExtendsClause(node: ExtendsClauseNode): string;
    serializeFile(nodes: StatementNode[]): string;
    serializeGenericExpression(node: GenericExpressionNode): string;
    serializeIdentifier(node: IdentifierNode): string;
    serializeImportClause(node: ImportClauseNode): string;
    serializeImportStatement(node: ImportStatementNode): string;
    serializeInferClause(node: InferClauseNode): string;
    serializeInterfaceDeclaration(node: InterfaceDeclarationNode): string;
    serializeLiteral(node: LiteralNode): string;
    serializeKey(key: string): string;
    serializeMappedType(node: MappedTypeNode): string;
    serializeObjectExpression(node: ObjectExpressionNode): string;
    serializeProperty(node: PropertyNode): string;
    serializeRawExpression(node: RawExpressionNode): string;
    serializeRuntimeEnum(node: RuntimeEnumDeclarationNode): string;
    serializeStatements(nodes: StatementNode[]): string;
    serializeUnionExpression(node: UnionExpressionNode): string;
}
export {};
