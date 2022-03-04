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

export interface IChunkServiceConfig {
	path: string;
}

export interface IChunkCommit {
	path: string;
	name: string,
	replace: boolean;
}

export interface IChunkService {
	chunk(chunkId: string, chunk: Promise<Buffer>): void;

	commit(chunkId: string, commit: IChunkCommit): IFile;
}
