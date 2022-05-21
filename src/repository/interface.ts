import {IEndpointParams, IQuery, IWithImporters, IWithSource} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export interface IRepository<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TToPage, TToPageQueryParams extends ParsedUrlQuery>
	extends IWithImporters<TCreate>,
		IWithSource<TCreate, TEntity, TQuery>,
		IWithRepositoryEndpoint<TCreate, TResponse, TQuery> {
	toMap(id: string): Promise<TResponse>;

	toPage(key: keyof TToPage, query: keyof TToPageQueryParams): GetServerSideProps<TToPage, TToPageQueryParams>;
}

export interface IRepositoryEndpoint<TCreate, TResponse, TQuery extends IQuery<any, any>> {
	create(params: IEndpointParams<TCreate, TResponse>): Promise<TResponse>;

	query(params: IEndpointParams<TQuery, TResponse[]>): Promise<TResponse[]>;

	delete(params: IEndpointParams<TQuery, TResponse[]>): Promise<TResponse[]>;

	count(params: IEndpointParams<TQuery, TResponse[]>): Promise<TResponse[]>;
}

export interface IWithRepositoryEndpoint<TCreate, TResponse, TQuery extends IQuery<any, any>> {
	handler: IRepositoryEndpoint<TCreate, TResponse, TQuery>;
}

export type IRepositoryCreate<T> = T extends IRepository<infer TCreate, any, any, any, any, any> ? TCreate : T;
export type IRepositoryEntity<T> = T extends IRepository<any, infer TEntity, any, any, any, any> ? TEntity : T;
export type IRepositoryResponse<T> = T extends IRepository<any, any, infer TResponse, any, any, any> ? TResponse : T;
export type IRepositoryQuery<T> = T extends IRepository<any, any, any, infer TQuery, any, any> ? TQuery : T;
export type IRepositoryFetchProps<T> = T extends IRepository<any, any, any, any, infer TFetchProps, any> ? TFetchProps : T;
export type IRepositoryFetchQuery<T> = T extends IRepository<any, any, any, any, any, infer TFetchQuery> ? TFetchQuery : T;
