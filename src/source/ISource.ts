import {IImportHandlers, IPrismaTransaction, IQuery, IQueryFilter, IUser, IWithIdentity, UndefinableOptional} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export interface ISource<TCreate, TEntity, TItem, TQuery extends IQuery = IQuery, TWithFetch extends Record<string, any> = any, TWithFetchParams extends ParsedUrlQuery = any> {
	readonly name: string;
	prisma: IPrismaTransaction;
	user: IUser;

	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<TEntity>;

	/**
	 * Create or update item.
	 *
	 * It also needs resolveId method to work properly.
	 *
	 * Internally, it should use create() with patch() in unique handler.
	 */
	import(create: TCreate): Promise<TEntity>;

	/**
	 * Resolve ID based on request (for example duplication detection).
	 *
	 * This should return an ID or throw an exception.
	 */
	createToId(create: TCreate): Promise<{ id: string }>;

	/**
	 * Patches the given entity.
	 */
	patch(patch: UndefinableOptional<TCreate> & IWithIdentity): Promise<TEntity>;

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
	 * Set the given user as a context; user requirement is based on the source's internals.
	 */
	withUser(user: IUser): this;

	/**
	 * Sets prisma context; useful when there is a transaction.
	 */
	withPrisma(prisma: IPrismaTransaction): this;

	map(source: TEntity): Promise<TItem>;

	mapNull(source?: TEntity | null): Promise<TItem | undefined>;

	list(source: Promise<TEntity[]>): Promise<TItem[]>;

	/**
	 * Utility to handle entity fetching for next.js server static props.
	 */
	withFetch(key: keyof TWithFetch, query: keyof TWithFetchParams): GetServerSideProps<TWithFetch, TWithFetchParams>;

	/**
	 * Get some things from the given source (prisma, user, ...).
	 *
	 * If nothing provided, nothing happens, it's just for convenience to prevent unnecessary conditions on the caller's side.
	 */
	ofSource(source?: ISource<any, any, any>): this;

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
export type ISourcePatch<T> = T extends ISource<infer U, any, any, any> ? UndefinableOptional<U> & IWithIdentity : T;
export type ISourceEntity<T> = T extends ISource<any, infer U, any, any> ? U : T;
export type ISourceItem<T> = T extends ISource<any, any, infer U, any> ? U : T;
export type ISourceQuery<T> = T extends ISource<any, any, any, infer U> ? U : T;
export type ISourceFetch<T> = T extends ISource<any, any, any, any, infer U> ? U : T;
export type ISourceFetchParams<T> = T extends ISource<any, any, any, any, any, infer U> ? U : T;
