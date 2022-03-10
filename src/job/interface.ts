export interface IJob {
	id: string;
	agenda: string;
	status: IJobStatus;
	total: number;
	success?: number;
	successRatio?: number;
	failure?: number;
	failureRatio?: number;
	created: Date;
	userId?: string;
}

export type IJobStatus = 'NEW' | 'RUNNING' | 'SUCCESS' | 'FAILURE' | 'DONE';
