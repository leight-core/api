import {IFileSource, ISource} from "@leight-core/api";

/**
 * Callback used to obtain a service from a Container.
 */
export type IContainerCallback<TService, T> = (service: TService) => Promise<T>;

export interface IContainer<TFileSource extends IFileSource<any, any>> {
	useFileSource<T>(callback: IContainerCallback<TFileSource, T>, source?: ISource<any, any, any>): Promise<T>;
}
