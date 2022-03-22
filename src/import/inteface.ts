export interface IImportTabs {
	tab: string;
	services: string[];
}

export interface IImportTranslations {
	[index: string]: string;
}

export interface IImportMeta {
	tabs: IImportTabs[];
	translations: IImportTranslations;
}

export interface IImportBeginEvent {
}

export interface IImportEndEvent {
}

export interface IImportHandler<TItem> {
	begin?(event: IImportBeginEvent): Promise<void>;

	end?(event: IImportEndEvent): Promise<void>;

	handler(item: TItem): Promise<any>;
}

export interface IImportHandlers {
	[index: string]: () => IImportHandler<any>;
}

export interface IImportEvents {
	onTotal?(jobId: string, total: number): Promise<void>;

	onSuccess?(jobId: string, success: number, total: number, processed: number): Promise<void>;

	onSkip?(jobId: string, success: number, total: number, processed: number): Promise<void>;

	onFailure?(jobId: string, error: Error, success: number, total: number, processed: number): Promise<void>;
}
