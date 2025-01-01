export type AnyType = unknown;

export type NumberDictionary = Record<string, number>;

export type StringDictionary = Record<string, string>;

export type UnknownDictionary = Record<string, AnyType>;

export type Dictionary = NumberDictionary | StringDictionary | UnknownDictionary;

export type DBFieldType = "int" | "text" | "date" | "json" | "bigint" | "float" | "double" | "varchar" | "boolean" | "datetime" | "longtext" | "mediumtext";
