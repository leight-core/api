import {IQueryParams} from "@leight-core/api";

export type INavigate<TQuery extends IQueryParams | undefined = undefined> = (href: string, query?: TQuery) => void;
