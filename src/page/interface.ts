import {GetServerSideProps} from "next";
import {ParsedUrlQuery}     from "querystring";
import {
	FC,
	ReactNode
}                           from "react";

export interface IPageWithLayout<P> extends FC<P> {
	layout(page: ReactNode): ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export interface IPageFetch<TFetch extends Record<string, any> = any, TParams extends ParsedUrlQuery = any> {
}

export interface IWithPageFetch<TPageFetch extends IPageFetch> {
	/**
	 * Utility to handle entity fetching for next.js server static props.
	 */
	withFetch(key: keyof PageFetchInfer.Fetch<TPageFetch>, query: keyof PageFetchInfer.Params<TPageFetch>): GetServerSideProps<PageFetchInfer.Fetch<TPageFetch>, PageFetchInfer.Params<TPageFetch>>;
}

export namespace PageFetchInfer {
	export type Fetch<T> = T extends IPageFetch<infer U> ? U : T;
	export type Params<T> = T extends IPageFetch<any, infer U> ? U : T;
}
