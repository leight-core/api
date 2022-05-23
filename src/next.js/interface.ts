import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

/**
 * Shortcut to pre-fetch entity on next.js server side props.
 */
export type IWithFetch<TWithFetch, TWithFetchParams extends ParsedUrlQuery> = (key: keyof TWithFetch, query: keyof TWithFetchParams) => GetServerSideProps<TWithFetch, TWithFetchParams>;
