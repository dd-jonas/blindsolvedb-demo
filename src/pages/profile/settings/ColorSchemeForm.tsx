import { useForm } from 'react-hook-form';
import { UseMutationResult } from 'react-query';
import { toast } from 'react-toastify';

import { Button, Checkbox, Cube, Select } from '#components';
import { colors } from '#config/cube';
import { Body } from '#services/profile';
import { Settings } from '#types/api';
import { Face } from '#types/cube';

const options = Object.entries(colors).map(([label, value]) => ({
  label,
  value,
}));

type ColorSchemeFormProps = {
  settings: Settings;
  mutation: UseMutationResult<null, Error, Body>;
};

type FormData = {
  colorScheme: Settings['color_scheme'];
  preferences: { colorTableHeaders: boolean };
};

export const ColorSchemeForm = ({
  settings,
  mutation,
}: ColorSchemeFormProps) => {
  const {
    register,
    handleSubmit,
    formState,
    reset,
    watch,
    getValues,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      colorScheme: { ...settings.color_scheme },
      preferences: {
        colorTableHeaders: settings.preferences.colorTableHeaders,
      },
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data, {
      onSuccess: () => {
        reset(data);
      },
      onError: () => {
        toast.error('Failed to save color scheme');
      },
    });
  });

  const rotate = (axis: 'x' | 'y' | 'z') => () => {
    const {
      colorScheme: { U, D, F, B, L, R },
    } = getValues();

    switch (axis) {
      case 'x':
        setValue('colorScheme.U', F, { shouldDirty: true });
        setValue('colorScheme.F', D, { shouldDirty: true });
        setValue('colorScheme.D', B, { shouldDirty: true });
        setValue('colorScheme.B', U, { shouldDirty: true });
        break;
      case 'y':
        setValue('colorScheme.F', R, { shouldDirty: true });
        setValue('colorScheme.R', B, { shouldDirty: true });
        setValue('colorScheme.B', L, { shouldDirty: true });
        setValue('colorScheme.L', F, { shouldDirty: true });
        break;
      case 'z':
        setValue('colorScheme.U', L, { shouldDirty: true });
        setValue('colorScheme.L', D, { shouldDirty: true });
        setValue('colorScheme.D', R, { shouldDirty: true });
        setValue('colorScheme.R', U, { shouldDirty: true });
        break;
    }
  };

  const currentColors = {
    U: watch('colorScheme.U'),
    D: watch('colorScheme.D'),
    F: watch('colorScheme.F'),
    B: watch('colorScheme.B'),
    L: watch('colorScheme.L'),
    R: watch('colorScheme.R'),
  };

  return (
    <form
      className="settings-form settings-form--color-scheme"
      onSubmit={onSubmit}
    >
      <div className="settings-form__cubes">
        <Cube colorScheme={currentColors} />
        <Cube colorScheme={currentColors} opposite />
      </div>

      <div>
        <h5>Colors</h5>

        <div className="settings-form__colors">
          {(['Up', 'Down', 'Front', 'Back', 'Left', 'Right'] as const).map(
            (face) => (
              <Select
                key={face}
                name={`colorScheme.${face[0] as Face}`}
                label={face}
                options={options}
                register={register}
              />
            )
          )}
        </div>
      </div>

      <div className="settings-form__rotate">
        <h5>Rotate</h5>

        <div>
          {(['x', 'y', 'z'] as const).map((rotation) => (
            <Button
              key={rotation}
              variant="tertiary"
              onClick={rotate(rotation)}
              small
            >
              {rotation}
            </Button>
          ))}
        </div>
      </div>

      <Checkbox
        name="preferences.colorTableHeaders"
        label="Color table headers"
        register={register}
      />

      <div className="settings-form__buttons">
        <Button
          variant="secondary"
          onClick={() =>
            reset({
              colorScheme: { ...settings.color_scheme },
              preferences: {
                colorTableHeaders: settings.preferences.colorTableHeaders,
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
