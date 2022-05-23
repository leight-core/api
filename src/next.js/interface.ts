import {GetServerSideProps} from "next";
import {ParsedUrlQuery} from "querystring";

export type toPage = <TToPage, TToPageQueryParams extends ParsedUrlQuery>(key: keyof TToPage, query: keyof TToPageQueryParams) => GetServerSideProps<TToPage, TToPageQueryParams>;
