export type ISelectionType = "none" | "single" | "multi";

export interface ISelectionContext<TSelection> {
	onSelect(id: string, selection: TSelection): void;

	isSelected(id: string): boolean;

	asSelection(): { [index in string]: TSelection; };

	toSelection(): TSelection[];
}
