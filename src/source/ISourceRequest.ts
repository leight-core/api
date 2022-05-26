import {IQuery, ISource, ISourceCreate, ISourceQuery} from "@leight-core/api";

export interface ISourceRequest<TSource extends ISource<any, any, any, IQuery<any, any>>> {
	get?: string;
	query?: ISourceQuery<TSource>;
	count?: ISourceQuery<TSource>;
	create?: ISourceCreate<TSource>;
	delete?: string[];
}
