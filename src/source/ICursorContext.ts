import {PaginationConfig} from "antd/es/pagination";
import {UseQueryResult} from "react-query";

export interface ICursorContext {
	readonly name: string;
	/**
	 * Current page.
	 */
	readonly page: number;
	/**
	 * Current page size.
	 */
	readonly size: number;

	readonly count: UseQueryResult<number, any> | undefined;

	pagination(): PaginationConfig | false | undefined;

	setPage(page: number, size: number): void;

	more(): void;

	hasMore(): boolean;
}
