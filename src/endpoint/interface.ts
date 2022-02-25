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

/**
 * Generic endpoint; SDK generates as POST by default.
 */
export type IEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (params: IEndpointParams<TRequest, TResponse, TQuery>) => void;
export type IEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => IEndpoint<TName, TRequest, TResponse, TQuery>;

// export const Endpoint = <TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void>(handler: IEndpoint<TName, TRequest, TResponse, TQuery>): IEndpointCallback<TName, TRequest, TResponse, TQuery> => {
// 	return (req, res) => handler({req, res});
// }

/**
 * When fetching an individual item, done by GET.
 */
export type IFetchEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, void, TResponse, TQuery>
export type IFetchEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => IFetchEndpoint<TName, TResponse, TQuery>;

/**
 * When fetching a list of items (arrayed by default), done by GET.
 */
export type IListEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, void, TResponse, TQuery>
export type IListEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => IListEndpoint<TName, TResponse, TQuery>;

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 *
 * Defaults to POST.
 */
export type IMutationEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, TRequest, TResponse, TQuery>;
export type IMutationEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => IMutationEndpoint<TName, TRequest, TResponse, TQuery>;

/**
 * Good old creation endpoint.
 *
 * Defaults by POST.
 */
export type ICreateEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
export type ICreateEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => ICreateEndpoint<TName, TRequest, TResponse, TQuery>;

/**
 * Endpoint used to partially update data
 *
 * Defaults to PATCH.
 */
export type IPatchEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
export type IPatchEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => IPatchEndpointCallback<TName, TRequest, TResponse, TQuery>;

/**
 * Endpoint used to query data on a server.
 *
 * Defaults to POST.
 */
export type IQueryEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = IEndpoint<TName, TRequest, IQueryResult<TResponse>, TQuery>;
export type IQueryEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => IQueryEndpoint<TName, TRequest, TResponse, TQuery>;

/**
 * Endpoint used to remove something.
 *
 * Defaults to DELETE.
 */
export type IDeleteEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = void> = IMutationEndpoint<TName, void, TResponse, TQuery>;
export type IDeleteEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = void> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => IDeleteEndpoint<TName, TResponse, TQuery>;
