import {IQueryParams} from "@leight-core/api";
import {PaginationConfig} from "antd/es/pagination";
import {UseMutationOptions, UseMutationResult, UseQueryResult} from "react-query";
import {AxiosRequestConfig} from "axios";
import {UseQueryOptions} from "react-query/types/react/types";

export type IQueryHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (request?: TRequest, queryParams?: TQueryParams, options?: UseQueryOptions<any, any, TResponse, any>, config?: AxiosRequestConfig<TRequest>) => UseQueryResult<TResponse>;
export type IMutationHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (queryParams?: TQueryParams, options?: UseMutationOptions<TResponse, any, TRequest>, config?: AxiosRequestConfig<TRequest>) => UseMutationResult<TResponse, any, TRequest>;
export type IHookCallback<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = () => (request?: TRequest, queryParams?: TQueryParams, config?: AxiosRequestConfig<TRequest>) => Promise<TResponse>;

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
	readonly result: UseQueryResult<IQueryResult<TResponse>, any>;

	pagination(): PaginationConfig | false | undefined;

	hasData(): boolean;

	map(mapper: (item: TResponse) => any): any;

	data(): IQueryResult<TResponse>;
}

export interface IFilterContext<TFilter = any> {
	readonly filter: TFilter;

	setFilter(filter?: TFilter): void;
}

export interface IOrderByContext<TOrderBy = any> {
	readonly orderBy: TOrderBy;

	setOrderBy(orderBy?: TOrderBy): void;
}

export interface ICursorContext {
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

export interface ISource<TEntity, TFilter, TOrderBy> {
	count(): Promise<number>;

	findMany(arg: { where?: TFilter, orderBy?: TOrderBy }): Promise<TEntity[]>;
}

export type ISourceMapper<TEntity, TResult> = (entities: Promise<TEntity[]>) => Promise<TResult[]>;

export type IQueryFilter<T> = T extends IQuery<infer TFilter> ? TFilter : T;
export type IQueryOrderBy<T> = T extends IQuery<any, infer TOrderBy> ? TOrderBy : T;

export type IMapperEntity<T> = T extends (entities: Promise<infer TEntity>[]) => any ? TEntity : T;
export type IMapperResult<T> = T extends (entities: Promise<any>[]) => infer TResult ? TResult : T;

export interface IToQuery<TMapper extends ISourceMapper<any, any>, TQuery extends IQuery<any, any>> {
	query: TQuery;
	mapper: ISourceMapper<IMapperEntity<TMapper>, IMapperResult<TMapper>>;
	source: ISource<IMapperEntity<TMapper>, IQueryFilter<TQuery>, IQueryOrderBy<TQuery>>;
}
