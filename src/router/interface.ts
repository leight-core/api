import {IQueryParams} from "@leight-core/api";

export interface INavigate<TQuery extends IQueryParams | void = void> {
	(href: string, query?: TQuery): void;
}
