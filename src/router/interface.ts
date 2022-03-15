import {IQueryParams} from "@leight-core/api";

export type INavigate<TQueryParams extends IQueryParams | undefined = undefined> = (href: string, queryParams?: TQueryParams) => void;
