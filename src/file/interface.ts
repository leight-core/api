export interface IFile {
	id: string;
	path: string;
	name: string;
	mime: string;
	size: number;
	native: string;
	created: string;
	updated?: string;
	ttl?: number;
}
