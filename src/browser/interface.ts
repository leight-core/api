import {UseQueryResult} from "react-query";

export interface IFingerprintContext {
	readonly fingerprint: UseQueryResult<string>;
}
