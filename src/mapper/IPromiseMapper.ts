export type IPromiseMapper<TSource, TTarget> = (source: Promise<TSource[]>) => Promise<TTarget[]>;

export type IPromiseMapperSource<T> = T extends IPromiseMapper<infer TSource, any> ? TSource : T;
export type IPromiseMapperTarget<T> = T extends IPromiseMapper<any, infer TTarget> ? TTarget : T;
