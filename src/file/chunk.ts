import {IEndpointParams, IFile, IFileService, IQueryParams} from "@leight-core/api";

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
	toFile(chunkId: string): string;

	chunk(chunkId: string, chunk: Promise<Buffer>): Promise<void>;

	commit(chunkId: string, commit: IChunkCommit): IFile;
}

export type IChunkServiceFactory = (deps: IChunkServiceDeps) => IChunkService;

export type IOnChunkCommit = <TRequest, TResponse, TQuery extends IQueryParams = IQueryParams>(file: IFile, params: IEndpointParams<TRequest, TResponse, TQuery>) => IFile;
