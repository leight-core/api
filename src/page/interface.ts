import {ParsedUrlQuery} from "querystring";
import {
	FC,
	ReactNode
}                       from "react";

export interface IPageWithLayout<P> extends FC<P> {
	layout(page: ReactNode): ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IPageEntity<TFetch extends Record<string, any> = any, TParams extends ParsedUrlQuery = any> {
}

export type IPageFetch<T> = T extends IPageEntity<infer U> ? U : T;
export type IPageParams<T> = T extends IPageEntity<any, infer U> ? U : T;
