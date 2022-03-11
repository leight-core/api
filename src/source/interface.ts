import {IQueryParams} from "@leight-core/api";
import {PaginationConfig} from "antd/es/pagination";
import {UseMutationOptions, UseMutationResult, UseQueryResult} from "react-query";
import {AxiosRequestConfig} from "axios";
import {UseQueryOptions} from "react-query/types/react/types";

export type IQueryHook<TRequest extends IQuery<TFilter, TOrderBy> | void, TResponse, TFilter = void, TOrderBy = void, TQuery extends IQueryParams | void = void> = (request?: TRequest, query?: TQuery, options?: UseQueryOptions<any, any, TResponse, any>, config?: AxiosRequestConfig<TRequest>) => UseQueryResult<TResponse>;
export type IMutationHook<TRequest, TResponse, TQuery extends IQueryParams | void = void> = (query?: TQuery, options?: UseMutationOptions<TResponse, any, TRequest>, config?: AxiosRequestConfig<TRequest>) => UseMutationResult<TResponse, any, TRequest>;
export type IHookCallback<TRequest, TResponse, TQuery extends IQueryParams | void = void> = () => (request?: TRequest, query?: TQuery, config?: AxiosRequestConfig<TRequest>) => Promise<TResponse>;

export interface IQuery<TFilter = void, TOrderBy = void> {
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

export interface ISourceContext<TResponse, TFilter = void, TOrderBy = void, TQuery extends IQueryParams | void = void> {
	readonly result: UseQueryResult<IQueryResult<TResponse>, any>;
	/**
	 * Current page
	 */
	readonly page?: number;

	/**
	 * Set a new page (and eventually size).
	 */
	setPage(page?: number, pageSize?: number): void;

	/**
	 * Page size
	 */
	readonly size?: number;

	/**
	 * Set a new page size
	 */
	setSize(size?: number): void;

	/**
	 * Current order by.
	 */
	readonly orderBy?: TOrderBy;

	/**
	 * Set new order by.
	 */
	setOrderBy(orderBy?: TOrderBy): void;

	readonly filter?: TFilter;

	setFilter(filter?: TFilter): void;

	/**
	 * Access to current query used to fetch a page.
	 */
	readonly query?: TQuery;

	/**
	 * Set a new query.
	 */
	setQuery(query?: TQuery): void;

	pagination(): PaginationConfig | false | undefined;

	hasData(): boolean;

	map(mapper: (item: TResponse) => any): any;

	data(): IQueryResult<TResponse>;
}
