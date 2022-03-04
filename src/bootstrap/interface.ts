import type {Locale} from "antd/lib/locale-provider";

export interface ILocaleConfig {
	antd: Locale;
}

export interface IBootstrapConfig {
	locale: ILocaleConfig,
}
