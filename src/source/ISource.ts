import {IPrismaTransaction, IPromiseMapper, IQuery, IUser} from "@leight-core/api";

export interface ISource<TCreate, TEntity, TItem, TQuery extends IQuery<any, any>> {
	readonly prisma: IPrismaTransaction;
	readonly name: string;
	readonly mapper: IPromiseMapper<TEntity, TItem>;
	readonly user: IUser;

	/**
	 * Creates a new entity by the given request.
	 */
	create(this: ISource<TCreate, TEntity, TItem, TQuery>, create: TCreate): Promise<TEntity>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	delete(this: ISource<TCreate, TEntity, TItem, TQuery>, ids: string[]): Promise<TEntity>;

	/**
	 * Run a query and return promise with the result.
	 */
	query(this: ISource<TCreate, TEntity, TItem, TQuery>, query: TQuery): Promise<TEntity[]>;

	/**
	 * Fetch a single optional entity.
	 */
	fetch(this: ISource<TCreate, TEntity, TItem, TQuery>, query: TQuery): Promise<TEntity | null>;

	/**
	 * Find required entity; if not found, an error should be thrown.
	 */
	find(this: ISource<TCreate, TEntity, TItem, TQuery>, query: TQuery): Promise<TEntity>;

	/**
	 * Get an entity (required) by the given id.
	 */

	get(this: ISource<TCreate, TEntity, TItem, TQuery>, id: string): Promise<TEntity>;

	/**
	 * Return count of items by the given query.
	 */
	count(this: ISource<TCreate, TEntity, TItem, TQuery>, query: TQuery): Promise<number>;

	/**
	 * Set the given user as a context; user requirement is based on the source's internals.
	 */
	withUser(user: IUser): ISource<TCreate, TEntity, TItem, TQuery>;

	/**
	 * Set custom mapper for this source.
	 */
	withMapper<TTarget>(mapper: IPromiseMapper<TEntity, TTarget>): ISource<TCreate, TEntity, TTarget, TQuery>;

	/**
	 * Sets prisma context; useful when there is a transaction.
	 */
	withPrisma(prisma: IPrismaTransaction): ISource<TCreate, TEntity, TItem, TQuery>;

	/**
	 * Sets default mapper of this source (if any).
	 */
	withDefaultMapper(): ISource<TCreate, TEntity, TItem, TQuery>;
}

export interface IWithSource<TCreate, TEntity, TItem, TQuery extends IQuery<any, any>> {
	source: ISource<TCreate, TEntity, TItem, TQuery>;
}

export type ISourceCreate<T> = T extends ISource<infer TCreate, any, any, any> ? TCreate : T;
export type ISourceEntity<T> = T extends ISource<any, infer TEntity, any, any> ? TEntity : T;
export type ISourceItem<T> = T extends ISource<any, any, infer TItem, any> ? TItem : T;
export type ISourceQuery<T> = T extends ISource<any, any, any, infer TQuery> ? TQuery : T;
