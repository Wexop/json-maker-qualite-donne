import type { DatabaseMetadata } from '../../introspector/metadata/database-metadata';
import { ExportStatementNode } from '../ast/export-statement-node';
import type { ExpressionNode } from '../ast/expression-node';
import { ImportStatementNode } from '../ast/import-statement-node';
import type { GeneratorDialect } from '../dialect';
import { RuntimeEnumsStyle } from '../generator/runtime-enums-style';
export type Overrides = {
    /**
     * Specifies type overrides for columns.
     *
     * @example
     * ```ts
     * // Allows overriding of columns to be a type-safe JSON column:
     * {
     *   columns: {
     *     "<table_name>.<column_name>": new JsonColumnType(
     *       new RawExpressionNode("{ postalCode: string; street: string; city: string }")
     *     ),
     *   }
     * }
     * ```
     */
    columns?: Record<string, ExpressionNode | string>;
};
type TransformOptions = {
    camelCase?: boolean;
    defaultSchemas?: string[];
    dialect: GeneratorDialect;
    metadata: DatabaseMetadata;
    overrides?: Overrides;
    runtimeEnums?: boolean;
    runtimeEnumsStyle?: RuntimeEnumsStyle;
};
export declare const transform: (options: TransformOptions) => (ExportStatementNode | ImportStatementNode)[];
export {};
