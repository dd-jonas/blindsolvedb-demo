import { Path, UseFormRegister } from 'react-hook-form';

type CheckboxProps<FormValues> = {
  label: string;
  name: Path<FormValues>;
  register: UseFormRegister<FormValues>;
};

export const Checkbox = <FormValues,>({
  label,
  name,
  register,
}: CheckboxProps<FormValues>) => {
  return (
    <label className="checkbox">
      <input type="checkbox" {...register(name)} />

      {label}
    </label>
  );
};
