import { LinkButton } from '#components';
import { TrainerOverview } from '#types/api';

type TrainerOverviewCardActionProps = {
  set: TrainerOverview;
};

export const TrainerOverviewCardAction = ({
  set,
}: TrainerOverviewCardActionProps) => {
  const needLearning = set.learned < set.used;
  const needReview = set.review > 0;

  return needReview ? (
    <LinkButton
      className="trainer-overview-card__action"
      to={`/trainer/${set.slug}/review`}
    >
      {`Review (${set.review})`}
    </LinkButton>
  ) : needLearning ? (
    <LinkButton
      className="trainer-overview-card__action"
      to={`/trainer/${set.slug}/learn`}
    >
      Learn
    </LinkButton>
  ) : null;
};
