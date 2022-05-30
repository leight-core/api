import {ISource, ISourceCreate, ISourcePatch, ISourceQuery} from "@leight-core/api";

export interface ISourceRequest<TSource extends ISource<any, any, any>> {
	get?: string;
	query?: ISourceQuery<TSource>;
	count?: ISourceQuery<TSource>;
	create?: ISourceCreate<TSource>;
	patch?: ISourcePatch<TSource>;
	delete?: string[];
}
