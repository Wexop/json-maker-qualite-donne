import { RuntimeEnumsStyle } from '../generator/generator/runtime-enums-style';
import { LogLevel } from '../generator/logger/log-level';
export declare const DEFAULT_OUT_FILE: string;
export declare const DEFAULT_LOG_LEVEL = LogLevel.WARN;
export declare const DEFAULT_RUNTIME_ENUMS_STYLE = RuntimeEnumsStyle.PASCAL_CASE;
export declare const DEFAULT_URL = "env(DATABASE_URL)";
export declare const LOG_LEVEL_NAMES: readonly ["debug", "info", "warn", "error", "silent"];
export declare const VALID_DIALECTS: string[];
