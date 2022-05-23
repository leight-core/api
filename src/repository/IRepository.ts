import {IQuery, IWithSource} from "@leight-core/api";

export interface IRepository<TCreate, TEntity, TItem, TQuery extends IQuery<any, any>> extends IWithSource<TEntity, TItem, TQuery> {
	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<TEntity>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	delete(ids: string[]): Promise<TEntity>;
}

export type IRepositoryCreate<T> = T extends IRepository<infer U, any, any, any> ? U : T;
export type IRepositoryEntity<T> = T extends IRepository<any, infer U, any, any> ? U : T;
export type IRepositoryItem<T> = T extends IRepository<any, any, infer U, any> ? U : T;
export type IRepositoryQuery<T> = T extends IRepository<any, any, any, infer U> ? U : T;
