export interface IBackupRequest {
}

export interface IBackupService {
	backup(backup: IBackupRequest): Promise<void>;
}
