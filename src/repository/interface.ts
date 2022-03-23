import {IImportHandlers, IPrismaClientTransaction, IQuery, IQueryResult} from "@leight-core/api";
import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> {
	create(create: TCreate): Promise<TEntity>;

	query(query: TQuery): Promise<IQueryResult<TResponse>>;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	map(entity: TEntity): Promise<TResponse>;

	list(entities: Promise<TEntity[]>): Promise<TResponse[]>;

	importers(): IImportHandlers;

	pageFetch(key: keyof TPageFetchProps, query: keyof TPageFetchQueryParams): GetServerSideProps<TPageFetchProps, TPageFetchQueryParams>;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>, TPageFetchProps, TPageFetchQueryParams extends ParsedUrlQuery> = (prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery, TPageFetchProps, TPageFetchQueryParams>;
