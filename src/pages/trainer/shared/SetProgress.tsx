import { ProgressBar } from '#components';
import { TrainerOverview } from '#types/api';

type SetProgressProps = {
  set: TrainerOverview;
};

export const SetProgress = ({ set }: SetProgressProps) => {
  return (
    <ProgressBar
      label={`${set.learned}/${set.used}${
        set.used < set.size ? ` (partial)` : ''
      }`}
      value={set.learned}
      maxValue={set.used}
      showLabel
    />
  );
};
