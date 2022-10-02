import {
  AdjustmentsIcon,
  ColorSwatchIcon,
  CubeIcon,
} from '@heroicons/react/outline';

import { Card } from '#components';
import { useSettings } from '#providers';
import { useUpdateSettings } from '#services/profile';

import { ColorSchemeForm } from './ColorSchemeForm';
import { LetteringSchemeForm } from './LetteringSchemeForm';
import { PreferencesForm } from './PreferencesForm';

export const Settings = () => {
  const settings = useSettings();
  const mutation = useUpdateSettings();

  return (
    <div className="settings">
      <Card title="Color scheme" icon={<ColorSwatchIcon />} large>
        <ColorSchemeForm settings={settings} mutation={mutation} />
      </Card>

      <Card title="Lettering scheme" icon={<CubeIcon />} large>
        <LetteringSchemeForm settings={settings} mutation={mutation} />
      </Card>

      <Card title="Preferences" icon={<AdjustmentsIcon />} large>
        <PreferencesForm settings={settings} mutation={mutation} />
      </Card>
    </div>
  );
};
