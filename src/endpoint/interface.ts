import {IQuery, IQueryParams} from "@leight-core/api";
import {NextApiRequest, NextApiResponse} from "next";

export interface INextApiRequest<TQuery extends IQueryParams | undefined = undefined, TRequest = undefined> extends Omit<NextApiRequest, "query"> {
	readonly query: TQuery;
	readonly body: TRequest;
}

export interface IEndpointParams<TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> {
	readonly req: INextApiRequest<TQueryParams, TRequest>;
	readonly res: NextApiResponse<TResponse>;
	readonly request: TRequest;
	readonly query: TQueryParams;

	toBody(): Promise<Buffer>;

	end(chunk?: any): void;

	toUserId(): string;

	toMaybeUserId(): string | undefined;
}

/**
 * Generic endpoint; SDK generates as POST by default.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IEndpoint<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (params: IEndpointParams<TRequest, TResponse, TQueryParams>) => Promise<TResponse | void>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IEndpointCallback<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * When fetching an individual item, done by GET.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IFetchEndpoint<TName extends string, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, undefined, TResponse, TQueryParams>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IFetchEndpointCallback<TName extends string, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, undefined>, res: NextApiResponse<TResponse>) => void;

/**
 * When fetching a list of items (arrayed by default), done by GET.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IListEndpoint<TName extends string, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, undefined, TResponse, TQueryParams>
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IListEndpointCallback<TName extends string, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, undefined>, res: NextApiResponse<TResponse>) => void;

/**
 * Mutation endpoint is a general endpoint used to do some server-side effect (some updated data or so).
 *
 * Defaults to POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IMutationEndpoint<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, TRequest, TResponse, TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IMutationEndpointCallback<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Good old creation endpoint.
 *
 * Defaults by POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ICreateEndpoint<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IMutationEndpoint<TName, TRequest, TResponse, TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type ICreateEndpointCallback<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Endpoint used to partially update data
 *
 * Defaults to PATCH.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IPatchEndpoint<TName extends string, TRequest, TResponse, TQuery extends IQueryParams | undefined = undefined> = IMutationEndpoint<TName, TRequest, TResponse, TQuery>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IPatchEndpointCallback<TName extends string, TRequest, TResponse, TQuery extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQuery, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Endpoint used to query data on a server.
 *
 * Defaults to POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IQueryEndpoint<TName extends string, TRequest extends IQuery<any, any> | undefined, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, TRequest, TResponse[], TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IQueryEndpointCallback<TName extends string, TRequest extends IQuery<any, any> | undefined, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse[]>) => void;

export type IEntityEndpoint<TName extends string, TRequest extends IQuery<any, any> | undefined, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, TRequest, TResponse, TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IEntityEndpointCallback<TName extends string, TRequest extends IQuery<any, any> | undefined, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Generic delete request; provide an array of object ids being removed (even just one - yaaay, it's an array!).
 *
 * Delete is done by POST, not DELETE method (sad, semantically wrong, but DELETE does not carry body).
 */
export interface IDeleteRequest {
	ids: string[];
}

/**
 * Endpoint used to remove something.
 *
 * Defaults to POST.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IDeleteEndpoint<TName extends string, TRequest extends IDeleteRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IMutationEndpoint<TName, TRequest, TResponse, TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IDeleteEndpointCallback<TName extends string, TRequest extends IDeleteRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;

/**
 * Generic request/response.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IRequestEndpoint<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = IEndpoint<TName, TRequest, TResponse, TQueryParams>;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export type IRequestEndpointCallback<TName extends string, TRequest, TResponse, TQueryParams extends IQueryParams | undefined = undefined> = (req: INextApiRequest<TQueryParams, TRequest>, res: NextApiResponse<TResponse>) => void;
