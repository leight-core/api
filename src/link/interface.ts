export interface IQueryParams {
	[key: string]: string | string[]
}

export interface ILinkContext {
	link<TQuery extends IQueryParams | void = void>(href: string, query?: TQuery): string;
}
