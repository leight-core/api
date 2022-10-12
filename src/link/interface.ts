export type IQueryParams = Record<string, string | undefined>;

export interface IQueryParamsContext<TQueryParams extends IQueryParams | undefined = undefined> {
	readonly queryParams: TQueryParams;

	setQueryParams(queryParams?: TQueryParams): void;
}
