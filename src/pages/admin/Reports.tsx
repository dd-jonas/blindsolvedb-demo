import { Alert, Message, Spinner } from '#components';
import { useReports } from '#services/admin';

import { ReportAccordion } from './ReportAccordion';

export const Reports = () => {
  const query = useReports();

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const reports = query.data;

  return (
    <>
      <Alert warning>
        This dashboard is for admins only. On this demo site, the current user
        is assumed to have has admin privileges.
      </Alert>

      <div className="reports">
        {reports.length === 0 ? (
          <Message>No reports left to handle!</Message>
        ) : (
          reports.map((report) => (
            <ReportAccordion key={report.id} report={report} />
          ))
        )}
      </div>
    </>
  );
};
