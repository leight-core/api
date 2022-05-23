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

export type IRepositoryCreate<T> = T extends IRepository<infer TCreate, any, any, any> ? TCreate : T;
