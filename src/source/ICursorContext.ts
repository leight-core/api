export interface ICursorContext {
	readonly name: string;
	/**
	 * Current page.
	 */
	readonly page: number;
	/**
	 * Number of available pages.
	 */
	readonly pages?: number;
	/**
	 * Total number of items (without any filter)
	 */
	readonly total?: number;
	/**
	 * Current page size.
	 */
	readonly size: number;
	readonly append?: boolean;
	readonly prepend?: boolean;
	/**
	 * Mark the context as ready (all paging data available).
	 */
	readonly isReady: boolean;

	setPage(page: number, size?: number): void;

	/**
	 * Set pages when an input is number of items (thus counting with current page size).
	 * @param pages
	 */
	setPages(pages?: number): void;

	/**
	 * Set page count manually (no internal computing is done).
	 * @param pages
	 */
	setPageCount(pages?: number): void;

	setTotal(total?: number): void;

	next(append?: boolean): void;

	prev(prepend?: boolean): void;

	/**
	 * Are there any data left (current page < pages).
	 */
	hasMore(): boolean;

	/**
	 * Move to the next page.
	 *
	 * @param append
	 */
	more(append?: boolean): void;

	setReady(ready: boolean): void;
}
