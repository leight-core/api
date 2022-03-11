import {NextApiRequest, NextApiResponse} from "next";
import {IQuery, IQueryParams, IQueryResult} from "@leight-core/api";

export interface INextApiRequest<TQuery extends IQueryParams, TRequest> extends Omit<NextApiRequest, "query"> {
	query: TQuery;
	body: TRequest;
}

export interface IEndpointParams<TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> {
	req: INextApiRequest<TQuery, TRequest>;
	res: NextApiResponse<TResponse>;
	query: TQuery;

	toBody(): Promise<Buffer>;
}

/**
 * Generic endpoint; SDK generates as POST by default.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = (params: IEndpointParams<TRequest, TResponse, TQuery>) => Promise<TResponse | void>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * When fetching an individual item, done by GET.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IFetchEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = IEndpoint<TName, void, TResponse, TQuery>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IFetchEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => void;

/**
 * When fetching a list of items (arrayed by default), done by GET.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IListEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = IEndpoint<TName, void, TResponse, TQuery>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IListEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => void;

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 *
 * Defaults to POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IMutationEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = IEndpoint<TName, TRequest, TResponse, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IMutationEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Good old creation endpoint.
 *
 * Defaults by POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ICreateEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ICreateEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Endpoint used to partially update data
 *
 * Defaults to PATCH.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IPatchEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IPatchEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Endpoint used to query data on a server.
 *
 * Defaults to POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IQueryEndpoint<TName extends string, TRequest extends IQuery, TResponse, TQuery extends IQueryParams = IQueryParams> = IEndpoint<TName, TRequest, IQueryResult<TResponse>, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IQueryEndpointCallback<TName extends string, TRequest extends IQuery, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Endpoint used to remove something.
 *
 * Defaults to DELETE.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IDeleteEndpoint<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = IMutationEndpoint<TName, void, TResponse, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IDeleteEndpointCallback<TName extends string, TResponse, TQuery extends IQueryParams = IQueryParams> = (req: INextApiRequest<TQuery, void>, res: NextApiResponse<TResponse>) => void;
