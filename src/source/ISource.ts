import {
	IImportHandlers,
	IPrismaTransaction,
	IQuery,
	IUser,
	IWithIdentity,
	QueryInfer,
	UndefinableOptional
}                           from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery}     from "querystring";

export interface ISource<//
	TCreate extends Record<string, any>,
	TEntity extends Record<string, any>,
	TItem extends Record<string, any>,
	TQuery extends IQuery = IQuery,
	TWithFetch extends Record<string, any> = any,
	TWithFetchParams extends ParsedUrlQuery = any,
	TBackup extends Record<string, any> = TEntity,
	> {
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
	 * This method adds support for making a backup of an entity (thus preparing it for
	 * restore counterpart).
	 *
	 * @param entity
	 */
	backup(entity: TEntity): Promise<TBackup | undefined>;

	/**
	 * Restore the given backed-up entity; if nothing provided, nothing happens.
	 *
	 * @param backup
	 */
	restore(backup?: TBackup): Promise<TEntity | undefined>;

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
	withFilter(query: TQuery): QueryInfer.Filter<TQuery> | undefined;

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

export namespace SourceInfer {
	export type Create<T> = T extends ISource<infer U, any, any, any> ? U : T;
	export type Patch<T> = T extends ISource<infer U, any, any, any> ? UndefinableOptional<U> & IWithIdentity : T;
	export type Entity<T> = T extends ISource<any, infer U, any, any> ? U : T;
	export type Item<T> = T extends ISource<any, any, infer U, any> ? U : T;
	export type Query<T> = T extends ISource<any, any, any, infer U> ? U : T;
	export type Fetch<T> = T extends ISource<any, any, any, any, infer U> ? U : T;
	export type FetchParams<T> = T extends ISource<any, any, any, any, any, infer U> ? U : T;
	export type Backup<T> = T extends ISource<any, any, any, any, any, any, infer U> ? U : T;
}
