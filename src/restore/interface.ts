/**
 * Interface of an exported item; it should contain all the data needed to restore
 * given item back into the entity.
 */
export interface IRestoreItem<TSource, TEntity> {
	source: TSource;
	entity: TEntity;
}
