export interface IFingerprintContext {
	readonly fingerprint: string;
}

export interface IResponsiveContext {
	isBrowser(): boolean;

	isMobile(): boolean;

	isTablet(): boolean;
}
