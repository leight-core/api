import {IUser} from "@leight-core/api";

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
	withUser(user: IUser): void;

	begin?(event: IImportBeginEvent): Promise<void>;

	end?(event: IImportEndEvent): Promise<void>;

	handler(item: TItem): Promise<any>;
}

export interface IImportHandlers {
	[index: string]: () => IImportHandler<any>;
}

export interface IWithImporters {
	importers: IImportHandlers;
}
