export type RequiredKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends { [P in K]: T[K] } ? never : K }[keyof T];

export type OptionalKeys<T> = { [K in keyof T]-?: Record<string, unknown> extends { [P in K]: T[K] } ? K : never }[keyof T];

export type PickRequired<T> = Pick<T, RequiredKeys<T>>;

export type PickOptional<T> = Pick<T, OptionalKeys<T>>;

export type Nullable<T> = { [P in keyof T]: T[P] | null };
export type Undefinable<T> = { [P in keyof T]: T[P] | undefined };

export type NullableWithOptional<T> =
	PickRequired<T>
	& Nullable<PickOptional<T>>;
export type UndefinableWithOptional<T> =
	PickRequired<T>
	& Undefinable<PickOptional<T>>;

export type NullableOptional<T> = Partial<NullableWithOptional<T>>;
export type UndefinableOptional<T> = Partial<UndefinableWithOptional<T>>;

export interface IndexOf<T> {
	[index: string]: T;
}

export type IfVoid<TType, TExtends = void> = TExtends extends void ? TType : TType & TExtends;

export type Unboxed<T> = T extends (infer U)[] ? U : T;
