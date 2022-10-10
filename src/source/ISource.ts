import {
	IBackupSource,
	IImportSource,
	IMutationSource,
	IPageEntity,
	IPrismaTransaction,
	IPromiseMapper,
	IQuery,
	IQuerySource,
	IResolveSource,
	IRestoreSource,
	IUser,
	IWithIdentity,
	UndefinableOptional
}                       from "@leight-core/api";
import {ParsedUrlQuery} from "querystring";

export interface ISource<//
	TCreate extends Record<string, any>,
	TEntity extends Record<string, any>,
	TItem extends Record<string, any>,
	TQuery extends IQuery = IQuery,
	TWithFetch extends Record<string, any> = any,
	TWithFetchParams extends ParsedUrlQuery = any,
	TBackup extends Record<string, any> = TEntity,
	> extends //
	IMutationSource<TCreate, TEntity>,
	IImportSource<TCreate, TEntity>,
	IPromiseMapper<TEntity, TItem>,
	IQuerySource<TEntity, TQuery>,
	IBackupSource<TEntity, TBackup>,
	IRestoreSource<TEntity, TBackup>,
	IPageEntity<TWithFetch, TWithFetchParams>,
	IResolveSource<TCreate> {
	readonly name: string;
	prisma: IPrismaTransaction;
	user: IUser;

	/**
	 * Set the given user as a context; user requirement is based on the source's internals.
	 */
	withUser(user: IUser): this;

	/**
	 * Sets prisma context; useful when there is a transaction.
	 */
	withPrisma(prisma: IPrismaTransaction): this;

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
