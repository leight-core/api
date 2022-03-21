import {IImportHandlers, IPrismaClientTransaction, IQuery, ISource} from "@leight-core/api";

export interface IRepositoryService<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> {
	create(create: TCreate): Promise<TEntity>;

	query(query: TQuery): any;

	fetch(id: string): Promise<TEntity>;

	toMap(id: string): Promise<TResponse>;

	map(entity: TEntity): Promise<TResponse>;

	importers(): IImportHandlers;
}

export type IRepositoryServiceFactory<TCreate, TEntity, TResponse, TQuery extends IQuery<any, any>> = (source: ISource<TEntity, TQuery>, prisma?: IPrismaClientTransaction) => IRepositoryService<TCreate, TEntity, TResponse, TQuery>;
