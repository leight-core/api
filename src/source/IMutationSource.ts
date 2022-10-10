import {
	IWithIdentity,
	UndefinableOptional
} from "@leight-core/api";

export interface IMutationSource<//
	TCreate extends Record<string, any>,
	TEntity extends Record<string, any>,
	> {
	/**
	 * Creates a new entity by the given request.
	 */
	create(create: TCreate): Promise<TEntity>;

	/**
	 * Patches the given entity.
	 */
	patch(patch: UndefinableOptional<TCreate> & IWithIdentity): Promise<TEntity>;

	/**
	 * Delete given entities by the list of given ids.
	 */
	remove(ids: string[]): Promise<TEntity[]>;
}
