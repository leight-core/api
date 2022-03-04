import {IEndpointParams} from "../endpoint";
import {IQueryParams} from "../link";

export interface IFile {
	id: string;
	path: string;
	name: string;
	mime: string;
	size: number;
	location: string;
	created: string;
	updated?: string;
	ttl?: number;
}

export interface IFileServiceConfig {
	path: string;
	defaultMimeType?: string;

	persistor?(file: IFile): void;
}

export interface IIFileServiceDeps {
	config?: IFileServiceConfig;
}

export interface IFileStoreRequest {
	/**
	 * File to store (absolute path); the source file will not be touched.
	 */
	file: string;
	/**
	 * Virtual path of the stored file.
	 */
	path: string;
	/**
	 * Virtual filename (with optional extension).
	 */
	name: string,
	/**
	 * If the file exists, should be replaced? If yes, original metadata should **not** be removed (e.g. database row), just updated.
	 */
	replace: boolean;
}

export interface IFileService {
	/**
	 * Detect mime of the given file.
	 */
	mimeOf(file: string): string;

	/**
	 * Return file size of the given file.
	 */
	sizeOf(file: string): number;

	/**
	 * Generates (absolute) file path based on the file id.
	 */
	toLocation(fileId: string): string;

	store(store: IFileStoreRequest): IFile;
}

export type IFileServiceFactory = (deps: IIFileServiceDeps) => IFileService;

export type IFileEndpointPersistor = <TRequest, TResponse, TQuery extends IQueryParams = IQueryParams>(file: IFile, params: IEndpointParams<TRequest, TResponse, TQuery>) => IFile;
