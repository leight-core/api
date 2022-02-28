export type IQueryParams = { [key: string]: string | string[] } | void;

export interface ILinkContext {
	generate<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;

	link<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;
}
