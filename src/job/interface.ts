import {IEndpointParams} from "@leight-core/api";
import AsyncLock from "async-lock";
import {Logger} from "winston";

export type ILockOptions = ConstructorParameters<typeof AsyncLock>[0];

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

export interface IJobHandlerRequest<TParams> {
	name: string;
	job: IJob<TParams>;
	params: TParams;
	userId?: string | null;
	jobProgress: IJobProgress;
	logger: Logger;

	progress<TResult>(callback: () => Promise<TResult>, sleep?: number): Promise<TResult | void>;
}

export interface IJobProcessor<TParams = any> {
	lock(): AsyncLock;

	request(params: IEndpointParams<TParams, IJob<TParams>>, lock?: ILockOptions): Promise<IJob<TParams>>;

	async(params: TParams, userId?: string | null, lock?: ILockOptions): Promise<IJob<TParams>>;

	handler(request: IJobHandlerRequest<TParams>): Promise<any>;
}

export type IJobStatus = "NEW" | "RUNNING" | "SUCCESS" | "FAILURE" | "REVIEW" | "DONE";
