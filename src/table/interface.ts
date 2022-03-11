import {IQueryParams, ISourceContext} from "@leight-core/api";
import {ColumnProps} from "antd/lib/table";
import {FilterValue} from "antd/lib/table/interface";
import {ReactNode} from "react";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	readonly dataIndex?: keyof TItem;
}

export interface IITableChildren<TResponse, TFilter = void, TOrderBy = void, TQuery extends IQueryParams | void = void> {
	column(props: ITableColumnProps<TResponse>): ReactNode;

	readonly sourceContext: ISourceContext<TResponse, TFilter, TOrderBy, TQuery>;
}

export type ITableChildrenCallback<TResponse, TFilter = void, TOrderBy = void, TQuery extends IQueryParams | void = void> = (children: IITableChildren<TResponse, TFilter, TOrderBy, TQuery>) => ReactNode

export interface ITableToFilter<TResponse, TFilter = void> {
	readonly filters: Record<keyof TResponse, FilterValue | null>;
	readonly current?: TFilter;
}

export type ITableToFilterCallback<TResponse, TFilter = void> = (filters: ITableToFilter<TResponse, TFilter>) => TFilter | undefined;
