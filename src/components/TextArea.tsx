import { LightBulbIcon } from '@heroicons/react/outline';
import { useTextField } from '@react-aria/textfield';
import clsx from 'clsx';
import { useRef } from 'react';
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

type TextAreaProps<FormValues> = {
  label?: string;
  name: Path<FormValues>;
  placeholder?: string;
  register: UseFormRegister<FormValues>;
  validation?: RegisterOptions;
  required?: boolean;
  description?: string;
  errorMessage?: string;
  hideLabel?: boolean;
  small?: boolean;
};

export const TextArea = <FormValues,>({
  label,
  name,
  placeholder,
  register,
  validation = {},
  required = false,
  description,
  errorMessage,
  hideLabel = false,
}: TextAreaProps<FormValues>) => {
  const ref = useRef(null);
  const { descriptionProps, errorMessageProps, inputProps, labelProps } =
    useTextField(
      {
        id: name,
        name,
        label: !hideLabel && label,
        'aria-label': label,
        description,
        errorMessage,
        isRequired: required,
        placeholder,
        inputElementType: 'textarea',
      },
      ref
    );

  return (
    <div className="input">
      {!hideLabel && (
        <label className="input__label" {...labelProps}>
          {label}
        </label>
      )}

      {description && (
        <p className="input__description" {...descriptionProps}>
          <LightBulbIcon />
          <small>{description}</small>
        </p>
      )}

      <textarea
        className={clsx('input__field', errorMessage && 'input__field--error')}
        {...inputProps}
        {...register(name, {
          required: { value: required, message: 'Required' },
          ...validation,
        })}
      />

      {errorMessage && (
        <p className="input__error" {...errorMessageProps}>
          <small>{errorMessage}</small>
        </p>
      )}
    </div>
  );
};
