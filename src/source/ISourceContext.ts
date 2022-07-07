import {PaginationConfig} from "antd/es/pagination";
import {UseQueryResult} from "react-query";

export interface ISourceContext<TResponse> {
	readonly name: string;

	readonly result: UseQueryResult<TResponse[], any>;
	/**
	 * If source is not configured to run with count enabled, this will be undefined.
	 */
	readonly count: UseQueryResult<number, any> | undefined;

	pagination(): PaginationConfig | false | undefined;

	hasData(): boolean;

	data(): TResponse[];

	map(mapper: (item: TResponse) => any): any;
}
