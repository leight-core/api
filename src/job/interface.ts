import {Agenda} from "agenda";

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
	readonly params: TParams;
}

export type IJobParams<T> = T extends IJob<infer TParams> ? TParams : T;

export interface IJobProgress {
	readonly jobId: string;

	result(): IJobStatus | undefined;

	success(): number;

	failure(): number;

	skip(): number;

	setTotal(total: number): Promise<any>;

	setStatus(status: IJobStatus): Promise<any>;

	onSuccess(): Promise<any>;

	onFailure(): Promise<any>;

	onSkip(): Promise<any>;

	setResult(result: IJobStatus): void;

	isReview(): boolean;
}

export interface IJobProcessor<TParams = any> {
	name(): string;

	register(agenda: Agenda): void;

	schedule(params: TParams, userId?: string): Promise<IJob<TParams>>;
}

export type IJobStatus = "NEW" | "RUNNING" | "SUCCESS" | "FAILURE" | "REVIEW" | "DONE";
