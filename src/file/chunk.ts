import {IFile, IFileService} from "@leight-core/api";

export interface IChunkCommit {
	path: string;
	name: string,
	replace: boolean;
}

export interface IChunkServiceConfig {
	path: string;
}

export interface IChunkServiceDeps {
	config?: IChunkServiceConfig;
	fileService: IFileService;
}

export interface IChunkService {
	chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

	commit(chunkId: string, commit: IChunkCommit): IFile;
}

export type IChunkServiceFactory = (deps: IChunkServiceDeps) => IChunkService;
