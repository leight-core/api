export type ISelectionType = "none" | "single" | "multi";
export type ISelectionBoolType = "true/false" | "true/false/undefined" | "true/undefined";

export const SelectionTrueFalse = {"true": false, "false": true, "undefined": true};
export const SelectionTrueUndefined = {"true": undefined, "undefined": true};
export const SelectionTrueFalseUndefined = {"undefined": true, "true": false, "false": undefined};
export const SelectionBoolTypeMap: { [index in ISelectionBoolType]: { [index in string]: boolean | undefined } } = {
	"true/false": SelectionTrueFalse,
	"true/false/undefined": SelectionTrueFalseUndefined,
	"true/undefined": SelectionTrueUndefined,
};

export interface ISelectionContext<TSelection> {
	onSelect(id: string, selection: TSelection): void;

	isSelected(id: string): boolean | undefined;

	asSelection(): { [index in string]: TSelection; };

	toSelection(): TSelection[];
}
