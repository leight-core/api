import {IImportHandlers, IPrismaTransaction, IPromiseMapper, IQuery, IQueryFilter, IUser, IWithIdentity, NullableOptional} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export interface ISource<TCreate, TEntity, TItem, TQuery extends IQuery = IQuery, TWithFetch extends Record<string, any> = any, TWithFetchParams extends ParsedUrlQuery = any> {
	readonly name: string;
	readonly prisma: IPrismaTransaction;
	readonly mapper: IPromiseMapper<TEntity, TItem>;
	readonly user: IUser;

	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<TEntity>;

	/**
	 * Patches the given entity.
	 */
	patch(patch: NullableOptional<TCreate> & IWithIdentity): Promise<TEntity>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	remove(ids: string[]): Promise<TEntity[]>;

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

	importers(): IImportHandlers;

	/**
	 * General method for converting input filter from a query into an output (for example, applying fulltext).
	 */
	withFilter(query: TQuery): IQueryFilter<TQuery> | undefined;

	/**
	 * Support for data inclusion in the result (originally for Prisma).
	 */
	withInclude<TInclude>(): TInclude;

	/**
	 * Set the given user as a context; user requirement is based on the source's internals.
	 */
	withUser(user: IUser): this;

	/**
	 * Set custom mapper for this source.
	 */
	withMapper<TTarget>(mapper: IPromiseMapper<TEntity, TTarget>): this;

	/**
	 * Sets prisma context; useful when there is a transaction.
	 */
	withPrisma(prisma: IPrismaTransaction): this;

	/**
	 * Sets default mapper of this source (if any).
	 */
	withDefaultMapper(): this;

	map(source?: TEntity | null): Promise<TItem | null>;

	/**
	 * Utility to handle entity fetching for next.js server static props.
	 */
	withFetch(key: keyof TWithFetch, query: keyof TWithFetchParams): GetServerSideProps<TWithFetch, TWithFetchParams>;

	/**
	 * Get some things from the given source (prisma, user, ...).
	 */
	ofSource(source: ISource<any, any, any>): this;

	/**
	 * Generates hash string for the given query; it's useful for generating cache key for example.
	 */
	hashOf(query: TQuery, type?: string): string;

	/**
	 * Clear cache, if any.
	 */
	clearCache(): Promise<any>;
}

export type ISourceCreate<T> = T extends ISource<infer U, any, any, any> ? U : T;
export type ISourcePatch<T> = T extends ISource<infer U, any, any, any> ? NullableOptional<U> & IWithIdentity : T;
export type ISourceEntity<T> = T extends ISource<any, infer U, any, any> ? U : T;
export type ISourceItem<T> = T extends ISource<any, any, infer U, any> ? U : T;
export type ISourceQuery<T> = T extends ISource<any, any, any, infer U> ? U : T;
export type ISourceFetch<T> = T extends ISource<any, any, any, any, infer U> ? U : T;
export type ISourceFetchParams<T> = T extends ISource<any, any, any, any, any, infer U> ? U : T;
