export type ISelectionType = "none" | "single" | "multi";

export interface ISelection<TSelection> {
	single: TSelection | undefined;
	selected: string[];
	items: { [index in string]: TSelection };
	isEmpty: boolean;
}

export interface ISelectionContext<TSelection> {
	enable(enable?: boolean): void;

	isEnabled(): boolean;

	/**
	 * Handle selection with the provided id.
	 */
	select(id: string, selection: TSelection): void;

	/**
	 * Remove an id..
	 *
	 * @param id
	 */
	deSelect(id: string): void;

	/**
	 * Handle selection with the provided item; id is taken from that item.
	 */
	item(item: TSelection & { id: string }): void;

	items(items: (TSelection & { id: string })[]): void;

	/**
	 * Remove selected item from selection.
	 *
	 * @param item
	 */
	deItem(item: TSelection & { id: string }): void;

	/**
	 * Return object with all selection stuff.
	 */
	selection(): ISelection<TSelection>;

	/**
	 * Tells if an item with the given id has been selected.
	 */
	isSelected(id: string): boolean;

	isSelectedItem(item: TSelection & { id: string }): boolean;

	/**
	 * Return a simple object with keys/values of the selected items.
	 */
	asSelection(): { [index in string]: TSelection; };

	/**
	 * Return an array of selected ids.
	 */
	toSelection(): string[];

	/**
	 * Return an array of selected items.
	 */
	toItems(): TSelection[];

	/**
	 * Return just a single selected id. If there is no selection, error is thrown.
	 */
	toSingle(): string;

	/**
	 * Return single selected item. IF there is no selection, error is thrown.
	 */
	toSingleItem(): TSelection;

	/**
	 * Is the list empty?
	 */
	isEmpty(): boolean;

	/**
	 * Calls the on selection internal event. Should be called for example by OK button calls or so.
	 */
	handleSelection(): void;

	/**
	 * Add selection event handler.
	 */
	onSelection(callback: (event: ISelection<TSelection>) => void): void;

	/**
	 * Clear all selection.
	 */
	clear(): void;
}
