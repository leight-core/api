import {i18n} from "i18next";
import {IQueryHook} from "@leight-core/api";

export interface II18NextContext {
	readonly i18next: i18n;
}

export interface ITranslation {
	readonly key: string;
	readonly value: string;
}

export interface ITranslations {
	readonly language: string;
	readonly namespace: string;
	readonly translations: ITranslation[];
}

export interface ITranslationBundle {
	readonly bundles: ITranslations[];
}

export type ITranslationsQuery = IQueryHook<void, ITranslationBundle, void>;
