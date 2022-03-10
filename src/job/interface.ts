export interface IJob<TParams = void> {
	id: string;
	status: IJobStatus;
	total: number;
	progress: number;
	success?: number | null;
	successRatio?: number | null;
	failure?: number | null;
	failureRatio?: number | null;
	skip?: number | null;
	skipRatio?: number | null;
	created: Date;
	userId?: string | null;
	params?: TParams;
}

export type IJobStatus = 'NEW' | 'RUNNING' | 'SUCCESS' | 'FAILURE';
