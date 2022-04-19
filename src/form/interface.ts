import {INavigate} from "@leight-core/api";
import {FormInstance} from "antd";
import CancelablePromise from "cancelable-promise";
import {NamePath} from "rc-field-form/lib/interface";
import {DependencyList} from "react";

export interface IFormItemContext {
	readonly field: NamePath;
	readonly label: string;

	setValue(value: any): void;

	getValue(): any;

	setErrors(errors: string[]): void;
}

export type IFormFields = [NamePath, any];

export interface IFormError {
	readonly id: NamePath;
	readonly error: string;
}

export interface IErrorHandler<TError, TFormValues> {
	readonly error: TError;
	readonly formContext: IFormContext<TFormValues>;
}

export type IFormErrorHandler<TError, TFormValues> = (error: IErrorHandler<TError, TFormValues>) => void;

export interface IFormErrorMap<TFormValues> {
	readonly [index: string]: IFormError | IFormErrorHandler<any, TFormValues>;
}

export interface IFormErrors {
	readonly message?: string;
	readonly errors: IFormError[];
}

export interface IFormContext<TValues = any> {
	readonly translation?: string;
	/**
	 * Antd form instance.
	 */
	readonly form: FormInstance;
	/**
	 * Current form errors.
	 */
	readonly errors: IFormErrors;

	/**
	 * Set field errors.
	 *
	 * @param errors
	 */
	setErrors(errors: IFormErrors): void;

	/**
	 * Set form values
	 *
	 * @param values values being set
	 */
	setValues(values: TValues): void;

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

	/**
	 * Force form refresh (just revalidate and reset fields to get current sync with visible fields).
	 */
	refresh(): void;

	/**
	 * Resolve with true or false.
	 */
	canSubmit(then?: (canSubmit: boolean) => void): CancelablePromise<boolean>;

	useCanSubmit(then?: (canSubmit: boolean) => void, deps?: DependencyList): void;
}

export type IToOptionMapper<TItem> = (item: TItem) => IBaseSelectOption;

export type IFormMutationMapper<TFormValues, TRequest> = (values: TFormValues) => TRequest;

export type IFormInitialMapper<TFormValues> = () => TFormValues;

export type IFormOnValuesChanged<TFormValues = any> = (success: IFormValuesChanged<TFormValues>) => void;
export type IFormOnChanged<TFormValues = any> = (change: IFormChanged<TFormValues>) => void;

export interface IFormValuesChanged<TFormValues> {
	readonly values: TFormValues;
	readonly formContext: IFormContext<TFormValues>;
	readonly changed: Partial<TFormValues>;
}

export interface IFormChanged<TFormValues> {
	readonly values: TFormValues;
	readonly formContext: IFormContext<TFormValues>;
}

export interface IFormSuccess<TFormValues, TResponse> {
	readonly navigate: INavigate;
	readonly values: TFormValues;
	readonly response: TResponse;
	readonly formContext: IFormContext<TFormValues>;
}

export type IFormOnSuccess<TFormValues, TResponse> = (success: IFormSuccess<TFormValues, TResponse>) => void;

export interface IFormFailure<TFormValues> {
	readonly error: string;
	readonly formContext: IFormContext<TFormValues>;
}

export type IFormOnFailure<TFormValues> = (failure: IFormFailure<TFormValues>) => void;

export interface IToError<TError, TFormValues> {
	readonly error: TError;
	readonly formContext: IFormContext<TFormValues>;
}

export type IBaseSelectItem = any;

export interface IBaseSelectOption {
	readonly value: IBaseSelectItem;
	readonly label: IBaseSelectItem;
}
