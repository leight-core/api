import {IQueryFilter, ISourceContext, ISourceItem, ISourceQuery} from "@leight-core/api";
import type {FilterValue} from "antd/es/table/interface";
import type {ColumnProps} from "antd/lib/table";
import {ReactNode} from "react";

export interface ITableColumnProps<TItem> extends Omit<ColumnProps<TItem>, "dataIndex"> {
	readonly dataIndex?: keyof TItem;
}

export interface IITableChildren<TSourceContext extends ISourceContext<any>> {
	column(props: ITableColumnProps<ISourceItem<TSourceContext>>): ReactNode;

	readonly sourceContext: TSourceContext;
}

export interface ITableChildrenCallback<TSourceContext extends ISourceContext<any>> {
	(children: IITableChildren<TSourceContext>): ReactNode;
}

export interface ITableToFilter<TSourceContext extends ISourceContext<any>> {
	readonly filters: Record<keyof ISourceItem<TSourceContext>, FilterValue | null>;
	readonly current?: IQueryFilter<ISourceQuery<TSourceContext>> | null;
}

export interface ITableToFilterCallback<TSourceContext extends ISourceContext<any>> {
	(filters: ITableToFilter<TSourceContext>): IQueryFilter<ISourceQuery<TSourceContext>> | null;
}
