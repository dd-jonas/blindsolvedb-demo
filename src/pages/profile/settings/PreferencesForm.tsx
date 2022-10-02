import { useForm } from 'react-hook-form';

import { Button, Checkbox } from '#components';
import { useSettings } from '#providers';
import { Settings } from '#types/api';

type FormData = {
  preferences: Pick<Settings['preferences'], 'showCaseActions'>;
};

export const PreferencesForm = () => {
  const { preferences, updateSettings } = useSettings();

  const { register, handleSubmit, formState, reset } = useForm<FormData>({
    defaultValues: {
      preferences: { showCaseActions: preferences.showCaseActions },
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateSettings(data);
    reset(data);
  });

  return (
    <form
      className="settings-form settings-form--preferences"
      onSubmit={onSubmit}
    >
      <div>
        <h5>Admin</h5>

        <Checkbox
          name="preferences.showCaseActions"
          label="Show case actions"
          register={register}
        />
      </div>

      <div className="settings-form__buttons">
        <Button
          variant="secondary"
          onClick={() =>
            reset({
              preferences: {
                showCaseActions: preferences.showCaseActions,
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
