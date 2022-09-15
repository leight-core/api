export interface IDrawerContext {
	/**
	 * Is the drawer visible?
	 */
	readonly open: boolean;

	/**
	 * Set drawer's status.
	 *
	 * @param open
	 */
	setOpen(open: boolean): void;

	close(): void;
}

export declare const PlacementTypes: ["top", "right", "bottom", "left"];
export declare type PlacementType = typeof PlacementTypes[number];
