// /**
//  * Basic record must have an ID, thus all records must be extended from this type.
//  */
// export interface IRecordItem {
// 	readonly [index: string]: any;
//
// 	readonly id: string;
// }
//
// export interface IndexOf<T> {
// 	[index: string]: T;
// }
//
// export type Unboxed<T> = T extends (infer U)[] ? U : T;

export type Nullable<T> = { [P in keyof T]: T[P] | null };

export type NullableOptional<T> = Nullable<Partial<T>>;
