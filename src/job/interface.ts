export interface IJob<TParams = any> {
	readonly id: string;
	readonly status: IJobStatus;
	readonly total: number;
	readonly progress: number;
	readonly success?: number | null;
	readonly successRatio?: number | null;
	readonly failure?: number | null;
	readonly failureRatio?: number | null;
	readonly skip?: number | null;
	readonly skipRatio?: number | null;
	readonly created: Date;
	readonly userId?: string | null;
	readonly params?: TParams;
}

export type IJobStatus = 'NEW' | 'RUNNING' | 'SUCCESS' | 'FAILURE';
