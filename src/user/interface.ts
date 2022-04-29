export interface IUserService {
	getUserId(): string;

	getOptionalUserId(): string | undefined;
}
