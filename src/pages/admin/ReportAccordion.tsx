import { LinkIcon, TrashIcon } from '@heroicons/react/outline';
import { OverlayContainer } from '@react-aria/overlays';
import { Fragment } from 'react';
import { toast } from 'react-toastify';

import { Button, Card, LinkButton, ModalDialog } from '#components';
import { useOverlayState } from '#hooks';
import { useDeleteReport } from '#services/admin';
import { Report } from '#types/api';

type ReportProps = {
  report: Report;
};

export const ReportAccordion = ({ report }: ReportProps) => {
  const mutation = useDeleteReport(report.id);
  const modal = useOverlayState();

  const deleteReport = () => {
    if (mutation.isLoading) return;

    mutation.mutate(null, {
      onError: () => {
        toast.error('Failed to delete report');
      },
    });
  };

  const info = [
    { label: 'Shape', value: report.shape },
    { label: 'Shape ID', value: report.shape_id },
    { label: 'Algorithm ID', value: report.algorithm_id },
    { label: 'User ID', value: report.user_id },
  ];

  return (
    <Card large className="report">
      <div className="report__info">
        {info.map((detail) => (
          <Fragment key={detail.label}>
            <p>
              <strong>{detail.label}</strong>
            </p>
            <p>{detail.value}</p>
          </Fragment>
        ))}
      </div>

      <div className="report__message">
        <p className="report__timestamp">
          {new Date(report.created_at).toLocaleString('en-GB', {
            dateStyle: 'long',
            timeStyle: 'short',
          })}
        </p>
        <p>{report.message}</p>
      </div>

      <div className="report__buttons">
        <LinkButton
          to={`/sheets/${report.set_slug}/${report.case_slug}`}
          icon={<LinkIcon />}
          variant="tertiary"
          small
        >
          Link
        </LinkButton>

        <Button
          onClick={modal.open}
          icon={<TrashIcon />}
          variant="tertiary"
          loading={mutation.isLoading}
          danger
          small
        >
          Close report
        </Button>
      </div>

      {modal.isOpen && (
        <OverlayContainer>
          <ModalDialog
            title={`Close report #${report.id}`}
            actionLabel="Yes"
            cancelLabel="No"
            onAction={deleteReport}
            onClose={modal.close}
            isOpen={modal.isOpen}
            danger
          >
            Are you sure you want to delete this report?
          </ModalDialog>
        </OverlayContainer>
      )}
    </Card>
  );
};
