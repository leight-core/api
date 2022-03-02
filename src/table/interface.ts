import {IQueryParams, ISourceContext} from "@leight-core/api";
import {ColumnProps} from "antd/lib/table";
import {FilterValue} from "antd/lib/table/interface";
import {ReactNode} from "react";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	readonly dataIndex?: keyof TItem;
}

export interface IITableChildren<TResponse, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any> {
	column(props: ITableColumnProps<TResponse>): ReactNode;

	readonly sourceContext: ISourceContext<TResponse, TQuery, TOrderBy, TFilter>;
}

export interface ITableChildrenCallback<TResponse, TQuery extends IQueryParams = IQueryParams, TOrderBy = any, TFilter = any> {
	(children: IITableChildren<TResponse, TQuery, TOrderBy, TFilter>): ReactNode;
}

export interface ITableToFilter<TResponse, TFilter> {
	readonly filters: Record<keyof TResponse, FilterValue | null>;
	readonly current?: TFilter | null;
}

export interface ITableToFilterCallback<TResponse, TFilter> {
	(filters: ITableToFilter<TResponse, TFilter>): TFilter | null;
}
