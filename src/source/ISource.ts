import {
	IBackupSource,
	IContainer,
	IImportSource,
	IMutationSource,
	IPageFetch,
	IPromiseMapper,
	IQuery,
	IQuerySource,
	IResolveSource,
	IRestoreSource,
	IWithContainer,
	IWithIdentity,
	IWithPageFetch,
	UndefinableOptional
} from "@leight-core/api";

export interface ISource<//
	TContainer extends IContainer<any>,
	TEntity extends Record<string, any>,
	TItem extends Record<string, any>,
	TQuery extends IQuery = IQuery,
	TCreate extends Record<string, any> = any,
	TBackup extends Record<string, any> = TEntity,
	TPageFetch extends IPageFetch = any,
	> extends //
	IWithContainer<TContainer>,
	IMutationSource<TCreate, TEntity>,
	IImportSource<TCreate, TEntity>,
	IPromiseMapper<TEntity, TItem>,
	IQuerySource<TEntity, TQuery>,
	IBackupSource<TEntity, TBackup>,
	IRestoreSource<TEntity, TBackup>,
	IWithPageFetch<TPageFetch>,
	IResolveSource<TCreate> {
	/**
	 * Name of the source.
	 */
	readonly name: string;

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
	export type Container<T> = T extends ISource<infer U, any, any> ? U : T;
	export type Entity<T> = T extends ISource<any, infer U, any> ? U : T;
	export type Item<T> = T extends ISource<any, any, infer U> ? U : T;
	export type Query<T> = T extends ISource<any, any, any, infer U> ? U : T;
	export type Create<T> = T extends ISource<any, any, any, any, infer U> ? U : T;
	export type Patch<T> = T extends ISource<any, any, any, any, infer U> ? UndefinableOptional<U> & IWithIdentity : T;
	export type Backup<T> = T extends ISource<any, any, any, any, any, infer U> ? U : T;
	export type PageFetch<T> = T extends ISource<any, any, any, any, any, any, infer U> ? U : T;
}
