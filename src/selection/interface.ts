export type ISelectionType = "none" | "single" | "multi";

export interface ISelectionContext<TSelection> {
	onSelect(id: string, selection: TSelection): void;

	onSelectItem(item: TSelection & { id: string }): void;

	isSelected(id: string): boolean;

	isSelectedItem(item: TSelection & { id: string }): boolean;

	asSelection(): { [index in string]: TSelection; };

	toSelection(): TSelection[];

	toSingle(): TSelection;

	isEmpty(): boolean;
}
