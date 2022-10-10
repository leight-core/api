import {IWithIdentity} from "@leight-core/api";

export interface IResolveSource<TSource extends Record<string, string>, TResult extends IWithIdentity = IWithIdentity> {
	/**
	 * Resolve ID based on request (for example duplication detection).
	 *
	 * This should return an ID or throw an exception.
	 */
	resolveId(source: TSource): Promise<TResult>;
}
