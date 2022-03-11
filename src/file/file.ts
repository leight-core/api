export interface IFile {
	readonly id: string;
	readonly path: string;
	readonly name: string;
	readonly mime: string;
	readonly size: number;
	readonly location: string;
	readonly created: string;
	readonly updated?: string;
	readonly ttl?: number;
}

export interface IFileServiceConfig {
	readonly path: string;
	readonly defaultMimeType?: string;
}

export interface IIFileServiceDeps {
	readonly config?: IFileServiceConfig;
}

export interface IFileStoreRequest {
	/**
	 * File to store (absolute path); the source file will not be touched.
	 */
	readonly file: string;
	/**
	 * Virtual path of the stored file.
	 */
	readonly path: string;
	/**
	 * Virtual filename (with optional extension).
	 */
	readonly name: string,
	/**
	 * If the file exists, should be replaced? If yes, original metadata should **not** be removed (e.g. database row), just updated.
	 */
	readonly replace: boolean;
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
