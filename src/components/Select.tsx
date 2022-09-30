import clsx from 'clsx';
import { Path, UseFormRegister } from 'react-hook-form';

type SelectProps<FormValues> = {
  label?: string;
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
  options: { label: string; value: string | number }[];
  required?: boolean;
  errorMessage?: string;
};

export const Select = <FormValues,>({
  options,
  name,
  label = '',
  register,
  required = false,
  errorMessage,
}: SelectProps<FormValues>) => {
  return (
    <div className="select">
      {label && (
        <label className="select__label" htmlFor={name}>
          {label}
        </label>
      )}

      <select
        className={clsx(
          'select__trigger',
          errorMessage && 'select__trigger--error'
        )}
        id={name}
        {...register(name, {
          required: { value: required, message: 'Required' },
        })}
      >
        {options.map((option) => (
          <option
            key={option.value}
            className="select__option"
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {errorMessage && (
        <p className="select__error">
          <small>{errorMessage}</small>
        </p>
      )}
    </div>
  );
};
