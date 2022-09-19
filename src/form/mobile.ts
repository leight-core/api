import {Form} from "antd-mobile";
import {NamePath} from "rc-field-form/lib/interface";
import {INavigate} from "../router";
import {IFormError, IFormErrors} from "./form";

class MobileFormWrapper<T> {
	wrapped() {
		const [form] = Form.useForm<T>();
		return form;
	}
}

export interface IMobileFormSuccess<TFormValues, TResponse> {
	/**
	 * Handy shortcut for navigation.
	 */
	readonly navigate: INavigate;
	/**
	 * Original values sent to the form.
	 */
	readonly values: TFormValues;
	/**
	 * Response values got after processing form.
	 */
	readonly response: TResponse;
	/**
	 * Access to the whole form context.
	 */
	readonly formContext: IMobileFormContext<TFormValues>;

	/**
	 * Translates given string using form's translation base if provided.
	 * @param text
	 * @param data
	 */
	t(text: string, data?: Record<string, any>): string;
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
	 * Set field errors.
	 *
	 * @param errors
	 */
	setErrors(errors: IFormErrors): void;

	/**
	 * Reset form to the initial state.
	 */
	reset(): void;

	/**
	 * Return current form values.
	 */
	values(): any;
}

export interface IMobileFormValuesChanged<TFormValues> {
	readonly values: TFormValues;
	readonly formContext: IMobileFormContext<TFormValues>;
	readonly changed: Partial<TFormValues>;
}

export interface IMobileFormChanged<TFormValues> {
	readonly values: TFormValues;
	readonly formContext: IMobileFormContext<TFormValues>;
}

export interface IMobileFormFailure<TFormValues> {
	readonly error: string;
	readonly formContext: IMobileFormContext<TFormValues>;
}

export interface IToMobileFormError<TError, TFormValues> {
	readonly error: TError;
	readonly formContext: IMobileFormContext<TFormValues>;
}

export interface IMobileErrorHandler<TError, TFormValues> {
	readonly error: TError;
	readonly formContext: IMobileFormContext<TFormValues>;
}

export type IMobileFormErrorHandler<TError, TFormValues> = (error: IMobileErrorHandler<TError, TFormValues>) => void;
export type IMobileFormErrorMap<TFormValues> = Record<string, IFormError | IMobileFormErrorHandler<any, TFormValues>>
