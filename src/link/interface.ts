export interface IQueryParams {
	[key: string]: string | string[];
}

export interface IQueryParamsContext<TQueryParams extends IQueryParams | undefined = undefined> {
	readonly queryParams: TQueryParams;

	setQueryParams(queryParams: TQueryParams): void;
}
