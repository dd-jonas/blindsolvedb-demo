import { ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

import { Card } from '#components';
import { TrainerOverview } from '#types/api';

import { SetProgress } from '../shared/SetProgress';
import { TrainerOverviewCardAction } from './TrainerOverviewCardAction';

type TrainerOverviewCardProps = {
  set: TrainerOverview;
};

export const TrainerOverviewCard = ({ set }: TrainerOverviewCardProps) => {
  return (
    <Card className="trainer-overview-card">
      <h3 className="trainer-overview-card__name">
        <Link to={set.slug}>
          {set.name}
          <ChevronRightIcon />
        </Link>
      </h3>

      <div className="trainer-overview-card__content">
        <div className="trainer-overview-card__progress">
          <SetProgress set={set} />
        </div>

        <TrainerOverviewCardAction set={set} />
      </div>
    </Card>
  );
};
