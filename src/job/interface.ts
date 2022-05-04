export interface IJob<TParams = any> {
	readonly id: string;
	readonly name: string;
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
	readonly started?: Date | null;
	readonly finished?: Date | null;
	readonly userId?: string | null;
	readonly params?: TParams;
}

export interface IJobProgress {
	readonly jobId: string;
	readonly success: number;
	readonly failure: number;
	readonly skip: number;

	total(total: number): Promise<any>;

	status(status: IJobStatus): Promise<any>;

	onSuccess(): Promise<any>;

	onFailure(): Promise<any>;

	onSkip(): Promise<any>;
}

export interface IJobProcessor<TParams = any> {
	name(): string;

	register(): void;

	schedule(params: TParams, userId?: string): void;
}

export type IJobStatus = "NEW" | "RUNNING" | "SUCCESS" | "FAILURE" | "REVIEW" | "DONE";
