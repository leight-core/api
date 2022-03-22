import {IImportHandlers, IPrismaClientTransaction, IQuery, IQueryResult} from "@leight-core/api";

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> {
	create(create: TCreate): Promise<TEntity>;

	query(query: TQuery): Promise<IQueryResult<TResponse>>;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	map(entity: TEntity): Promise<TResponse>;

	list(entities: Promise<TEntity[]>): Promise<TResponse[]>;

	importers(): IImportHandlers;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> = (prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery>;
