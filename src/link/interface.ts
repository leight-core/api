export interface IQueryParams {
	[key: string]: string | string[]
}

export interface ILinkContext {
	link<TQuery extends IQueryParams = IQueryParams>(href: string, query?: TQuery): string;
}
