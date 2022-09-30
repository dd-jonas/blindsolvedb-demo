import {
  AcademicCapIcon,
  DotsVerticalIcon,
  LightningBoltIcon,
} from '@heroicons/react/solid';
import { OverlayContainer } from '@react-aria/overlays';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useMediaMatch, useOutsideClickRef } from 'rooks';

import { Button, LinkButton, ModalDialog } from '#components';
import { useOverlayState } from '#hooks';
import { useMarkAsLearned, useResetProgress } from '#services/trainer';
import { TrainerDetail } from '#types/api';

type TrainerDetailActionsProps = {
  set: TrainerDetail;
};

export const TrainerDetailActions = ({ set }: TrainerDetailActionsProps) => {
  const isSmallScreen = useMediaMatch('(max-width: 768px)');
  const [showMore, setShowMore] = useState(false);
  const markAsLearnedModal = useOverlayState();
  const resetProgressModal = useOverlayState();

  const markAsLearnMutation = useMarkAsLearned(set.slug);
  const resetProgressMutation = useResetProgress(set.slug);

  const markAsLearned = () => {
    if (markAsLearnMutation.isLoading) return;
    markAsLearnMutation.mutate(null, {
      onError: () => {
        toast.error('Failed to mark set as learned');
      },
    });
  };

  const resetProgress = () => {
    if (resetProgressMutation.isLoading) return;
    resetProgressMutation.mutate(null, {
      onError: () => {
        toast.error('Failed to mark set as learned');
      },
    });
  };

  const [ref] = useOutsideClickRef(() => setShowMore(false));

  const needLearning = set.learned < set.used;
  const needReview = set.review > 0;
  const canReview = set.results > 0;
  const canReset = set.results > 0;

  return (
    <div ref={ref} className="trainer-detail__actions">
      {needLearning && (
        <LinkButton
          to={`/trainer/${set.slug}/learn`}
          icon={<AcademicCapIcon />}
          small={isSmallScreen}
        >
          Learn
        </LinkButton>
      )}

      {canReview && (
        <LinkButton
          to={`/trainer/${set.slug}/review`}
          variant={!needLearning && needReview ? 'primary' : 'ghost'}
          icon={<LightningBoltIcon />}
          small={isSmallScreen}
        >
          {needReview ? `Review (${set.review})` : 'Review ahead'}
        </LinkButton>
      )}

      <Button
        variant="ghost"
        icon={<DotsVerticalIcon />}
        onClick={() => setShowMore((prev) => !prev)}
        small={isSmallScreen}
      >
        {isSmallScreen ? '' : 'More actions'}
      </Button>

      {showMore && (
        <div className="trainer-detail__more-actions">
          <LinkButton
            to={`/sheets/${set.slug}?tab=user`}
            variant="ghost"
            small={isSmallScreen}
          >
            Edit algorithms
          </LinkButton>

          {needLearning && (
            <Button
              variant="ghost"
              onClick={() => {
                setShowMore(false);
                markAsLearnedModal.open();
              }}
              small={isSmallScreen}
            >
              Mark all as learned
            </Button>
          )}

          {canReset && (
            <Button
              variant="ghost"
              onClick={() => {
                setShowMore(false);
                resetProgressModal.open();
              }}
              small={isSmallScreen}
              danger
            >
              Reset progress
            </Button>
          )}
        </div>
      )}

      {markAsLearnedModal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Mark as learned"
            actionLabel="Mark set as learned"
            isOpen={markAsLearnedModal.isOpen}
            onAction={markAsLearned}
            onClose={markAsLearnedModal.close}
          >
            This action will mark all algorithms in this set as learned. Note
            that an additional review is needed to start calculating average
            times.
            <br />
            Are you sure you want to proceed?
          </ModalDialog>
        </OverlayContainer>
      )}

      {resetProgressModal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title="Reset progress"
            actionLabel="Yes, reset progress"
            isOpen={resetProgressModal.isOpen}
            onAction={resetProgress}
            onClose={resetProgressModal.close}
            danger
          >
            This action cannot be undone. This will remove all results of each
            of your algorithms in this set.
            <br />
            Are you sure you want to proceed?
          </ModalDialog>
        </OverlayContainer>
      )}
    </div>
  );
};
