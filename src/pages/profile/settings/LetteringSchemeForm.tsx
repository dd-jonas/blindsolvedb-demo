import { useForm, UseFormRegister } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

import { Button, Checkbox, Input } from '#components';
import { Body } from '#services/profile';
import { Settings } from '#types/api';

type LetteringSchemeFormProps = {
  settings: Settings;
  mutation: UseMutationResult<null, Error, Body>;
};

type FormData = {
  letteringScheme: Settings['lettering_scheme'];
  preferences: { useLetteringScheme: boolean };
};

export const LetteringSchemeForm = ({
  settings,
  mutation,
}: LetteringSchemeFormProps) => {
  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      letteringScheme: { ...settings.lettering_scheme },
      preferences: {
        useLetteringScheme: settings.preferences.useLetteringScheme,
      },
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset(data);
      },
      onError: () => {
        toast.error('Failed to save lettering scheme');
      },
    });
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
                    formState.errors.letteringScheme?.[target]?.message
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
                    formState.errors.letteringScheme?.[target]?.message
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
              letteringScheme: { ...settings.lettering_scheme },
              preferences: {
                useLetteringScheme: settings.preferences.useLetteringScheme,
              },
            })
          }
          loading={mutation.isLoading}
          disabled={!formState.isDirty}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          loading={mutation.isLoading}
          disabled={!formState.isDirty}
        >
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
      name={`letteringScheme.${name}`}
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
