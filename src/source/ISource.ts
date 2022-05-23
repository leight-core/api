import {IPrismaTransaction, IPromiseMapper, IQuery, IQueryFilter, IUser} from "@leight-core/api";

export interface ISource<TEntity, TItem, TQuery extends IQuery<any, any>> {
	readonly name: string;
	readonly prisma: IPrismaTransaction;
	readonly mapper: IPromiseMapper<TEntity, TItem>;
	readonly user: IUser;

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

	filter(filter?: IQueryFilter<TQuery>): IQueryFilter<TQuery> | undefined;

	/**
	 * Set the given user as a context; user requirement is based on the source's internals.
	 */
	withUser(user: IUser): ISource<TEntity, TItem, TQuery>;

	withUserId(id?: string | null): ISource<TEntity, TItem, TQuery>;

	/**
	 * Set custom mapper for this source.
	 */
	withMapper<TTarget>(mapper: IPromiseMapper<TEntity, TTarget>): ISource<TEntity, TTarget, TQuery>;

	/**
	 * Sets prisma context; useful when there is a transaction.
	 */
	withPrisma(prisma: IPrismaTransaction): ISource<TEntity, TItem, TQuery>;

	/**
	 * Sets default mapper of this source (if any).
	 */
	withDefaultMapper(): ISource<TEntity, TItem, TQuery>;
}

export interface IWithSource<TEntity, TItem, TQuery extends IQuery<any, any>> {
	source: ISource<TEntity, TItem, TQuery>;
}

export type ISourceEntity<T> = T extends ISource<infer U, any, any> ? U : T;
export type ISourceItem<T> = T extends ISource<any, infer U, any> ? U : T;
export type ISourceQuery<T> = T extends ISource<any, any, infer U> ? U : T;
