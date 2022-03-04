import {i18n} from "i18next";
import {IQueryHook} from "@leight-core/api";

export interface II18NextContext {
	readonly i18next: i18n;
}

export interface ITranslation {
	readonly language: string;
	readonly label: string;
	readonly text: string;
}

export interface ITranslations {
	readonly translations: ITranslation[];
}

export type ITranslationsQuery = IQueryHook<void, ITranslations, void>;
