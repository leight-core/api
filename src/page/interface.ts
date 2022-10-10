import {GetServerSideProps} from "next";
import {ParsedUrlQuery}     from "querystring";
import {
	FC,
	ReactNode
}                           from "react";

export interface IPageWithLayout<P> extends FC<P> {
	layout(page: ReactNode): ReactNode;
}

export interface IPageEntity<TFetch extends Record<string, any> = any, TParams extends ParsedUrlQuery = any> {
	/**
	 * Utility to handle entity fetching for next.js server static props.
	 */
	withFetch(key: keyof TFetch, query: keyof TParams): GetServerSideProps<TFetch, TParams>;
}

export namespace PageEntityInfer {
	export type Fetch<T> = T extends IPageEntity<infer U> ? U : T;
	export type Params<T> = T extends IPageEntity<any, infer U> ? U : T;
}
