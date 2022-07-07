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
	readonly append?: boolean;
	readonly prepend?: boolean;

	setPage(page: number, size?: number): void;

	next(append?: boolean): void;

	prev(prepend?: boolean): void;
}
