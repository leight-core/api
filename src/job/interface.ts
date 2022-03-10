export interface IJob {
	id: string;
	agenda: string;
	status: IJobStatus;
	total: number;
	success?: number | null;
	successRatio?: number | null;
	failure?: number | null;
	failureRatio?: number | null;
	created: Date;
	userId?: string | null;
}

export type IJobStatus = 'NEW' | 'RUNNING' | 'SUCCESS' | 'FAILURE' | 'DONE';
