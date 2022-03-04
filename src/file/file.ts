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
}

export interface IIFileServiceDeps {
	config?: IFileServiceConfig;
}

export interface IFileService {
}

export type IFileServiceFactory = (deps: IIFileServiceDeps) => IFileService;
