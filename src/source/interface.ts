import {IQueryParams} from "@leight-core/api";
import {AxiosRequestConfig} from "axios";
import {UseMutationOptions, UseMutationResult, UseQueryResult} from "react-query";
import {UseQueryOptions} from "react-query/types/react/types";

export type IQueryHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (request?: TRequest, queryParams?: TQueryParams, options?: UseQueryOptions<any, any, TResponse, any>, config?: AxiosRequestConfig<TRequest>) => UseQueryResult<TResponse>;
export type IMutationHook<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (queryParams?: TQueryParams, options?: UseMutationOptions<TResponse, any, TRequest>, config?: AxiosRequestConfig<TRequest>) => UseMutationResult<TResponse, any, TRequest>;
export type IPromiseCallback<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (request?: TRequest, queryParams?: TQueryParams, config?: AxiosRequestConfig<TRequest>) => Promise<TResponse>;
export type IHookCallback<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = () => IPromiseCallback<TRequest, TResponse, TQueryParams>;

export interface IWithFulltext {
	fulltext?: string;
}
