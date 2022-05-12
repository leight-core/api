import {IImportHandlers, IPrismaClientTransaction, IQuery, IQueryFilter, IQueryResult} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> {
	create(create: TCreate): Promise<TEntity>;

	handleCreate({request}: { request: TCreate }): Promise<TResponse>;

	query(query: TQuery): Promise<IQueryResult<TResponse>>;

	handleQuery({request}: { request: TQuery }): Promise<IQueryResult<TResponse>>;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	map(entity: TEntity): Promise<TResponse>;

	list(entities: Promise<TEntity[]>): Promise<TResponse[]>;

	importers(): IImportHandlers;

	pageFetch(key: keyof TPageFetchProps, query: keyof TPageFetchQueryParams): GetServerSideProps<TPageFetchProps, TPageFetchQueryParams>;

	toFilter(filter?: IQueryFilter<TQuery>): IQueryFilter<TQuery> | undefined;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> = (prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery, TPageFetchProps, TPageFetchQueryParams>;

export type IRepositoryCreate<T> = T extends IRepositoryService<infer TCreate, any, any, any, any, any> ? TCreate : T;
export type IRepositoryEntity<T> = T extends IRepositoryService<any, infer TEntity, any, any, any, any> ? TEntity : T;
export type IRepositoryResponse<T> = T extends IRepositoryService<any, any, infer TResponse, any, any, any> ? TResponse : T;
export type IRepositoryQuery<T> = T extends IRepositoryService<any, any, any, infer TQuery, any, any> ? TQuery : T;
export type IRepositoryFetchProps<T> = T extends IRepositoryService<any, any, any, any, infer TFetchProps, any> ? TFetchProps : T;
export type IRepositoryFetchQuery<T> = T extends IRepositoryService<any, any, any, any, any, infer TFetchQuery> ? TFetchQuery : T;

export type IMapOf = <T, R, U>(source: Promise<T[]>, map: (item: T) => R, mapper: (item: R) => Promise<U>) => Promise<U[]>;
