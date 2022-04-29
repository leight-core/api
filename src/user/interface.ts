export interface IUserService {
	getUserId(): Promise<string>;

	getOptionalUserId(): Promise<string | undefined>;
}
