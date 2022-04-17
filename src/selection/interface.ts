export interface ISelectionContext<TSelection> {
	onSelect(selection: TSelection): boolean | undefined;

	toSelection(): TSelection[];
}
