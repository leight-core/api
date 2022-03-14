export interface IQueryParams {
	[key: string]: string | string[]
}

export interface ILinkContext {
	link<TQuery extends IQueryParams | void = void>(href: string, query?: TQuery): string;
}

export interface IQueryParamsContext<TQueryParams extends IQueryParams | void = void> {
	readonly queryParams?: TQueryParams;

	setQueryParams(queryParams?: TQueryParams): void;
}
