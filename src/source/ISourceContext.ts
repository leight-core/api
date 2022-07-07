import {UseQueryResult} from "react-query";

export interface ISourceContext<TResponse> {
	readonly name: string;

	readonly result: UseQueryResult<TResponse[], any>;

	readonly count?: UseQueryResult<number, any>;

	hasData(): boolean;

	data(): TResponse[];

	map(mapper: (item: TResponse) => any): any;

	more(append?: boolean): void;

	hasMore(): boolean;
}
