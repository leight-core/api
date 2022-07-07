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

	setPage(page: number, size: number): void;
}
