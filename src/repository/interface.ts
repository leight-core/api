import {IImportHandlers, IPrismaClientTransaction, IQuery, IQueryResult} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export type IRepositoryCreateCallback<TCreate, TEntity> = (create: TCreate, onUniqueError?: (create: TCreate) => Promise<TEntity>) => Promise<TEntity>;

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> {
	create: IRepositoryCreateCallback<TCreate, TEntity>;

	handleCreate({request}: { request: TCreate }): Promise<TResponse>;

	query(query: TQuery): Promise<IQueryResult<TResponse>>;

	handleQuery({request}: { request: TQuery }): Promise<IQueryResult<TResponse>>;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	map(entity: TEntity): Promise<TResponse>;

	list(entities: Promise<TEntity[]>): Promise<TResponse[]>;

	importers(): IImportHandlers;

	pageFetch(key: keyof TPageFetchProps, query: keyof TPageFetchQueryParams): GetServerSideProps<TPageFetchProps, TPageFetchQueryParams>;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> = (prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery, TPageFetchProps, TPageFetchQueryParams>;

export type IRepositoryCreate<T> = T extends IRepositoryService<infer TCreate, any, any, any, any, any> ? TCreate : T;
export type IRepositoryEntity<T> = T extends IRepositoryService<any, infer TEntity, any, any, any, any> ? TEntity : T;
export type IRepositoryResponse<T> = T extends IRepositoryService<any, any, infer TResponse, any, any, any> ? TResponse : T;
export type IRepositoryQuery<T> = T extends IRepositoryService<any, any, any, infer TQuery, any, any> ? TQuery : T;
export type IRepositoryFetchProps<T> = T extends IRepositoryService<any, any, any, any, infer TFetchProps, any> ? TFetchProps : T;
export type IRepositoryFetchQuery<T> = T extends IRepositoryService<any, any, any, any, any, infer TFetchQuery> ? TFetchQuery : T;
