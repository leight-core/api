import {IQueryParams} from "@leight-core/api";
import {PaginationConfig} from "antd/es/pagination";
import {AxiosRequestConfig} from "axios";
import {UseMutationOptions, UseMutationResult, UseQueryResult} from "react-query";
import {UseQueryOptions} from "react-query/types/react/types";

export type IQueryHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (request?: TRequest, queryParams?: TQueryParams, options?: UseQueryOptions<any, any, TResponse, any>, config?: AxiosRequestConfig<TRequest>) => UseQueryResult<TResponse>;
export type IMutationHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (queryParams?: TQueryParams, options?: UseMutationOptions<TResponse, any, TRequest>, config?: AxiosRequestConfig<TRequest>) => UseMutationResult<TResponse, any, TRequest>;
export type IPromiseCallback<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (request?: TRequest, queryParams?: TQueryParams, config?: AxiosRequestConfig<TRequest>) => Promise<TResponse>;
export type IHookCallback<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = () => IPromiseCallback<TRequest, TResponse, TQueryParams>;

export interface IQuery<TFilter = undefined, TOrderBy = undefined> {
	/** currently requested page */
	readonly page?: number;
	/** limit number of items per page */
	readonly size?: number;
	/**
	 * support for exact item filtering (like by an id or name or whatever)
	 */
	readonly filter?: TFilter;
	/**
	 *  support for ordering items
	 */
	readonly orderBy?: TOrderBy;
}

export interface IQueryResult<TItem> {
	/** number of total available items in the source */
	readonly total: number;
	/** current page size */
	readonly size?: number;
	/** total available pages (precomputed based on total number of items and page size) */
	readonly pages?: number;
	/** number of items on the current page; usually same as page size, could be less */
	readonly count: number;
	/** items on the page */
	readonly items: TItem[];
}

export interface ISourceContext<TResponse> {
	readonly name: string;

	readonly result: UseQueryResult<IQueryResult<TResponse>, any>;

	pagination(): PaginationConfig | false | undefined;

	hasData(): boolean;

	map(mapper: (item: TResponse) => any): any;

	data(): IQueryResult<TResponse>;
}

export interface IFilterContext<TFilter = any> {
	/**
	 * Name of this filter context.
	 */
	readonly name: string;

	/**
	 * Currently set filtering.
	 */
	readonly filter: TFilter;
	/**
	 * When filtering from a form or any kind of source which is mapping filter,
	 * this is the original request (for example from filter form or so.).
	 *
	 * It's useful to restore filter form with the current filter.
	 */
	readonly source: any;

	/**
	 * Set the given filter as current (thus replacing one already set).
	 */
	setFilter(filter?: TFilter, source?: any): void;

	/**
	 * Apply the given filter, thus merging with the one already set, but replacing first-level properties (thus there is no deep-merge).
	 */
	applyFilter(filter?: TFilter): void;

	/**
	 * Deep merge with the current filter.
	 */
	mergeFilter(filter?: TFilter): void;

	isEmpty(): boolean;
}

export interface IOrderByContext<TOrderBy = any> {
	readonly name: string;

	readonly orderBy: TOrderBy;

	setOrderBy(orderBy?: TOrderBy): void;
}

export interface ICursorContext {
	readonly name: string;

	/**
	 * Current page.
	 */
	readonly page?: number;
	/**
	 * Current page size.
	 */
	readonly size?: number;

	setPage(page?: number, size?: number): void;
}

export type ISourceMapper<TEntity, TResult> = (entities: Promise<TEntity[]>) => Promise<TResult[]>;

export type IQueryFilter<T> = T extends IQuery<infer TFilter, any> ? TFilter & { fulltext?: string } : T;
export type IQueryOrderBy<T> = T extends IQuery<any, infer TOrderBy> ? TOrderBy : T;

export type IMapperEntity<T> = T extends ISourceMapper<infer TEntity, any> ? TEntity : T;
export type IMapperResult<T> = T extends ISourceMapper<any, infer TResult> ? TResult : T;

export interface ISource<TEntity, TQuery extends IQuery<any, any>> {
	count(arg?: { where?: IQueryFilter<TQuery> }): Promise<number>;

	findMany(arg?: { where?: IQueryFilter<TQuery>, orderBy?: IQueryOrderBy<TQuery>, skip?: number | undefined, take?: number | undefined }): Promise<TEntity[]>;

	findUnique(arg: { where: { id: string }, rejectOnNotFound: boolean }): Promise<TEntity | null>;
}

export interface IToQuery<TMapper extends ISourceMapper<any, any>, TQuery extends IQuery<any, any>> {
	query: TQuery;
	mapper: ISourceMapper<IMapperEntity<TMapper>, IMapperResult<TMapper>>;
	source: ISource<IMapperEntity<TMapper>, TQuery>;

	toFilter?(filter?: IQueryFilter<TQuery>): IQueryFilter<TQuery> | undefined,
}

export interface IWhereFulltext {
	fulltext?: string | null;
}
