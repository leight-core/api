export interface IMapper<TSource, TTarget> {
	/**
	 * Map all the given source to targets.
	 */
	list(source: Promise<TSource[]>): Promise<TTarget[]>;

	/**
	 * Actual mapper.
	 */
	map(source: TSource): Promise<TTarget>;
}
