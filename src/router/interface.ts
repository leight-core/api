import {IQueryParams} from "@leight-core/api";

export interface INavigate<TQuery extends IQueryParams = IQueryParams> {
	(href: string, query?: TQuery): void;
}
