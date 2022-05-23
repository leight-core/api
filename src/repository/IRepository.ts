import {IQuery, ISource, ISourceEntity, ISourceItem, ISourceQuery} from "@leight-core/api";

export interface IRepository<TCreate, TSource extends ISource<any, any, IQuery<any, any>>> {
	readonly source: TSource;

	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<ISourceEntity<TSource>>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	delete(ids: string[]): Promise<ISourceEntity<TSource>[]>;

	/**
	 * Shortcut to internal source.
	 */
	withUserId(id?: string | null): IRepository<TCreate, TSource>;
}

export type IRepositoryCreate<T> = T extends IRepository<infer U, any> ? U : T;
export type IRepositorySource<T> = T extends IRepository<any, infer U> ? U : T;
export type IRepositoryEntity<T> = T extends IRepository<any, infer U> ? ISourceEntity<U> : T;
export type IRepositoryItem<T> = T extends IRepository<any, infer U> ? ISourceItem<U> : T;
export type IRepositoryQuery<T> = T extends IRepository<any, infer U> ? ISourceQuery<U> : T;
