import {
  AdjustmentsIcon,
  ColorSwatchIcon,
  CubeIcon,
} from '@heroicons/react/outline';

import { Alert, Card } from '#components';

import { ColorSchemeForm } from './ColorSchemeForm';
import { LetteringSchemeForm } from './LetteringSchemeForm';
import { PreferencesForm } from './PreferencesForm';

export const Settings = () => {
  return (
    <div className="settings">
      <Alert warning>
        All settings are stored in-memory. Refresh the page to reset everything
        to default.
      </Alert>

      <Card title="Color scheme" icon={<ColorSwatchIcon />} large>
        <ColorSchemeForm />
      </Card>

      <Card title="Lettering scheme" icon={<CubeIcon />} large>
        <LetteringSchemeForm />
      </Card>

      <Card title="Preferences" icon={<AdjustmentsIcon />} large>
        <PreferencesForm />
      </Card>
    </div>
  );
};
