import {ISource} from "@leight-core/api";

export interface ISourceResponse<TSource extends ISource<any, any, any>> {
	get: Awaited<ReturnType<TSource["get"]>>;
	query: Awaited<ReturnType<TSource["query"]>>;
	count: Awaited<ReturnType<TSource["count"]>>;
	create: Awaited<ReturnType<TSource["create"]>>;
	patch?: Awaited<ReturnType<TSource["patch"]>>;
	delete: Awaited<ReturnType<TSource["delete"]>>;
}
