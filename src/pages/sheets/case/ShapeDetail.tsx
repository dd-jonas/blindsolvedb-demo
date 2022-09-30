import { useAuth0 } from '@auth0/auth0-react';

import { Alert, Spinner } from '#components';
import { useShape } from '#services/admin';

type ShapeDetailProps = { shapeId: number };

export const ShapeDetail = ({ shapeId }: ShapeDetailProps) => {
  const { user } = useAuth0();
  const query = useShape(shapeId);

  if (query.isLoading || query.isIdle) return <Spinner />;
  if (query.isError) return <Alert danger>{query.error.message}</Alert>;

  const shape = query.data;

  return (
    <dl>
      <dt>Shape ID</dt>
      <dd>{shape.id}</dd>
      <dt>Algorithm ID</dt>
      <dd>{shape.algorithm_id}</dd>
      <dt>Text</dt>
      <dd>{shape.text}</dd>
      <dt>Base</dt>
      <dd>{shape.base}</dd>
      <dt>Users</dt>
      <dd>{shape.users}</dd>
      <dt>Created by</dt>
      <dd>
        {shape.created_by}
        {shape.created_by === user?.sub && ' (you)'}
      </dd>
      <dt>Created at</dt>
      <dd>{new Date(shape.created_at).toLocaleString()}</dd>
    </dl>
  );
};
