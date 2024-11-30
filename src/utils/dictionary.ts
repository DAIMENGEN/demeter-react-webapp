export type NumberDictionary = Record<string, number>;

export type StringDictionary = Record<string, string>;

export type UnknownDictionary = Record<string, unknown>;

export type Dictionary = NumberDictionary | StringDictionary | UnknownDictionary;