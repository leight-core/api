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
