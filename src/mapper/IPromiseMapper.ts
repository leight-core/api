import {IMapper} from "@leight-core/api";

export interface IPromiseMapper<TSource, TTarget> extends IMapper<Promise<TSource>, Promise<TTarget>> {
}

export type IPromiseMapperSource<T> = T extends IPromiseMapper<Awaited<infer TSource>, any> ? TSource : T;
export type IPromiseMapperTarget<T> = T extends IPromiseMapper<any, Awaited<infer TTarget>> ? TTarget : T;
