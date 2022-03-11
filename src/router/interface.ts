import {IQueryParams} from "@leight-core/api";

export type INavigate<TQuery extends IQueryParams | void = void> = (href: string, query?: TQuery) => void;
