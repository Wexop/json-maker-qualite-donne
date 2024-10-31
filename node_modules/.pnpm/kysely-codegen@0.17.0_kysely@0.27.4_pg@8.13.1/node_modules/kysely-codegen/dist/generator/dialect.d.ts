import { IntrospectorDialect } from '../introspector/dialect';
import type { Adapter } from './adapter';
/**
 * A Dialect is the glue between the codegen and the specified database.
 */
export declare abstract class GeneratorDialect extends IntrospectorDialect {
    abstract readonly adapter: Adapter;
}
