import { useForm, UseFormRegister } from 'react-hook-form';

import { Button, Checkbox, Input } from '#components';
import { useSettings } from '#providers';
import { Settings } from '#types/api';

type FormData = {
  lettering_scheme: Settings['lettering_scheme'];
  preferences: { useLetteringScheme: boolean };
};

export const LetteringSchemeForm = () => {
  const { lettering_scheme, preferences, updateSettings } = useSettings();

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      lettering_scheme: { ...lettering_scheme },
      preferences: { useLetteringScheme: preferences.useLetteringScheme },
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateSettings(data);
    reset(data);
  });

  return (
    <form
      className="settings-form settings-form--lettering-scheme"
      onSubmit={onSubmit}
    >
      <div>
        <h5>Corners</h5>

        <div className="settings-form__ls-inputs">
          {(
            [
              ['UBL', 'UBR', 'UFR', 'UFL'],
              ['LUB', 'LUF', 'LDF', 'LDB'],
              ['FUL', 'FUR', 'FDR', 'FDL'],
              ['RUF', 'RUB', 'RDB', 'RDF'],
              ['BUR', 'BUL', 'BDL', 'BDR'],
              ['DFL', 'DFR', 'DBR', 'DBL'],
            ] as const
          ).map((group, i) => (
            <div key={i}>
              {group.map((target) => (
                <LetteringSchemeInput
                  key={target}
                  register={register}
                  name={target}
                  errorMessage={
                    formState.errors.lettering_scheme?.[target]?.message
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h5>Edges</h5>

        <div className="settings-form__ls-inputs">
          {(
            [
              ['UB', 'UR', 'UF', 'UL'],
              ['LU', 'LF', 'LD', 'LB'],
              ['FR', 'FU', 'FD', 'FL'],
              ['RU', 'RB', 'RD', 'RF'],
              ['BU', 'BL', 'BD', 'BR'],
              ['DF', 'DR', 'DB', 'DL'],
            ] as const
          ).map((group, i) => (
            <div key={i}>
              {group.map((target) => (
                <LetteringSchemeInput
                  key={target}
                  register={register}
                  name={target}
                  errorMessage={
                    formState.errors.lettering_scheme?.[target]?.message
                  }
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <Checkbox
        name="preferences.useLetteringScheme"
        label="Use lettering scheme"
        register={register}
      />

      <div className="settings-form__buttons">
        <Button
          variant="secondary"
          onClick={() =>
            reset({
              lettering_scheme: { ...lettering_scheme },
              preferences: {
                useLetteringScheme: preferences.useLetteringScheme,
              },
            })
          }
          disabled={!formState.isDirty}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!formState.isDirty}>
          Save changes
        </Button>
      </div>
    </form>
  );
};

type LetteringSchemeInputProps = {
  register: UseFormRegister<FormData>;
  name: keyof Settings['lettering_scheme'];
  errorMessage?: string;
};

const LetteringSchemeInput = ({
  name,
  register,
  errorMessage,
}: LetteringSchemeInputProps) => {
  return (
    <Input
      key={name}
      name={`lettering_scheme.${name}`}
      label={name}
      register={register}
      required
      validation={{
        maxLength: { value: 5, message: 'Maximum 5 characters' },
      }}
      errorMessage={errorMessage}
      small
    />
  );
};
