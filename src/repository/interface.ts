import {IImportHandlers, IPrismaClientTransaction, IQuery, IQueryFilter} from "@leight-core/api";

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> {
	create(create: TCreate): Promise<TEntity>;

	query(query: TQuery): any;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	toMapList(filter: IQueryFilter<TQuery>): Promise<TResponse[]>;

	map(entity: TEntity): Promise<TResponse>;

	importers(): IImportHandlers;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> = (prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery>;
