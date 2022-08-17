import {ISourceContext, ISourceItem} from "@leight-core/api";
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
