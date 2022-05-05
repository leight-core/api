import LRUCache from "lru-cache";

export interface IWithCache {
	cache: LRUCache<string, any>;

	key(): string;

	compute(): Promise<any>;
}
