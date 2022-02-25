import {IQueryResult} from "@leight-core/api";
import {NextApiRequest, NextApiResponse} from "next";

export type IQueryParams = { [key: string]: string | string[] } | void;

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

export interface IEndpointParams<TRequest, TResponse, TQuery extends IQueryParams = void> {
	req: INextApiRequest<TQuery, TRequest>;
	res: NextApiResponse<TResponse>;
}

export interface IEndpointCallback<TRequest, TResponse, TQuery extends IQueryParams = void> {
	(params: IEndpointParams<TRequest, TResponse, TQuery>): void;
}

/**
 * Generic endpoint; SDK generates as POST by default.
 */
export type IEndpoint<TName, TRequest, TResponse, TQuery extends IQueryParams = void> = (params: IEndpointParams<TRequest, TResponse, TQuery>) => void;

/**
 * When fetching an individual item, done by GET.
 */
export type IFetchEndpoint<TName, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, void, TResponse, TQuery>
/**
 * When fetching a list of items (arrayed by default), done by GET.
 */
export type IListEndpoint<TName, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, void, TResponse, TQuery>

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 *
 * Defaults to POST.
 */
export type IMutationEndpoint<TName, TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, TRequest, TResponse, TQuery>;
/**
 * Good old creation endpoint.
 *
 * Defaults by POST.
 */
export type ICreateEndpoint<TName, TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
/**
 * Endpoint used to partially update data
 *
 * Defaults to PATCH.
 */
export type IPatchEndpoint<TName, TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
/**
 * Endpoint used to query data on a server.
 *
 * Defaults to POST.
 */
export type IQueryEndpoint<TName, TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, TRequest, IQueryResult<TResponse>, TQuery>;

/**
 * Endpoint used to remove something.
 *
 * Defaults to DELETE.
 */
export type IDeleteEndpoint<TName, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, void, TResponse, TQuery>;
