import {IQuery} from "@leight-core/api";

export interface ISource<TCreate, TEntity, TQuery extends IQuery<any, any>> {
	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<TEntity>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	delete(ids: string[]): Promise<TEntity>;

	/**
	 * Run a query and return promise with the result.
	 */
	query(query: TQuery): Promise<TEntity[]>;

	/**
	 * Fetch a single optional entity.
	 */
	fetch(query: TQuery): Promise<TEntity | null>;

	/**
	 * Find required entity; if not found, an error should be thrown.
	 */
	find(query: TQuery): Promise<TEntity>;

	/**
	 * Get an entity (required) by the given id.
	 */
	get(id: string): Promise<TEntity>;

	/**
	 * Return count of items by the given query.
	 */
	count(query: TQuery): Promise<number>;
}

export interface IWithSource<TCreate, TEntity, TQuery extends IQuery<any, any>> {
	source: ISource<TCreate, TEntity, TQuery>;
}
