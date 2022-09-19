import {Form} from "antd-mobile";
import {NamePath} from "rc-field-form/lib/interface";

class MobileFormWrapper<T> {
	wrapped() {
		return Form.useForm<T>();
	}
}

export interface IMobileFormContext<TValues = any> {
	readonly translation?: string;
	/**
	 * Antd form instance.
	 */
	readonly form: ReturnType<MobileFormWrapper<TValues>["wrapped"]>;

	/**
	 * Set form values
	 *
	 * @param values values being set
	 */
	setValues(values: TValues): void;

	setValue(value: { name: NamePath, value: any }[]): void;

	/**
	 * Reset form to the initial state.
	 */
	reset(): void;

	/**
	 * Return current form values.
	 */
	values(): any;

	/**
	 * Throw away all error messages of all fields.
	 */
	resetErrors(): void;
}
