export type IQueryParams = { [key: string]: string | string[] } | void;

export interface ILinkContext {
	link<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;
}
