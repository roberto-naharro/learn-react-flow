/**
 * Utility types for TypeScript
 */

/**
 * Recursively flattens and simplifies a given type, resolving intersections and mapped types
 * into a more readable and "prettified" object structure.
 *
 * @typeParam T - The type to prettify.
 *
 * @remarks
 * - If `T` is an array type, it will recursively prettify the array's element type.
 * - If `T` is an object type, this utility will create a new type with the same properties,
 *   recursively prettifying each property.
 * - If `T` is not an object or array, it is returned as-is.
 * - Only the first level of objects and arrays are prettified; nested objects or arrays will
 *   not be deeply flattened to avoid large types and possible circular references.
 *
 * @example
 * ```typescript
 * type Original = { a: number } & { b: string };
 * type Pretty = Prettify<Original>; // { a: number; b: string }
 *
 * type ArrayType = { a: number } & { b: string }[];
 * type PrettyArrayType = Prettify<ArrayType>; // { a: number; b: string }[]
 * ```
 */
export type Prettify<T> = T extends Array<infer U> | (infer U)[]
  ? Prettify<U>[]
  : T extends { [K in keyof T]: unknown }
    ? { [K in keyof T]: T[K] }
    : T;

/**
 * Utility type to create a new type based on an existing type `T`, where
 * the properties specified in `K` are made optional, while the rest of the properties
 * remain unchanged.
 * @typeParam T - The original type.
 * @typeParam K - The keys of `T` that should be made optional.
 * @example
 * ```typescript
 * interface User {
 *   id: number;
 *   name: string;
 *   email: string;
 * }
 * type PartialUser = PartialKeys<User, 'email'>;
 * // Resulting type:
 * // {
 * //   id: number;
 * //   name: string;
 * //   email?: string; // 'email' is optional
 * // }
 * ```
 */
export type PartialKeys<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
