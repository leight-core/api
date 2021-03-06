import {UseQueryResult} from "@tanstack/react-query";

export interface ISourceContext<TResponse> {
	readonly name: string;

	readonly result: UseQueryResult<TResponse[], any>;

	readonly count?: UseQueryResult<number, any>;

	hasData(): boolean;

	data(): TResponse[];

	reset(): void;

	map(mapper: (item: TResponse) => any): any;

	more(append?: boolean): Promise<void>;

	hasMore(): boolean;
}
