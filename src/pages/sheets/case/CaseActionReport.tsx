import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { Button, Card, Select, TextArea } from '#components';
import { useReportShape } from '#services/admin';
import { Case } from '#types/api';

type FormValues = {
  shapeId: string;
  message: string;
};

type CaseActionReportProps = {
  algorithms: Case['algorithms'];
  close: () => void;
};

export const CaseActionReport = ({
  algorithms,
  close,
}: CaseActionReportProps) => {
  const mutation = useReportShape();
  const { handleSubmit, register, formState, watch } = useForm<FormValues>({
    defaultValues: { shapeId: '', message: '' },
  });

  const options = algorithms.flatMap((algorithm) =>
    algorithm.shapes.map((shape) => ({
      label: shape.text,
      value: `${shape.id}`,
    }))
  );

  const shapeId = watch('shapeId');

  const onSubmit = handleSubmit((values) => {
    if (mutation.isLoading) return;
    if (!values.shapeId) return close();

    mutation.mutate(values, {
      onSuccess: () => {
        close();
      },
      onError: () => {
        toast.error('Faield to report algorithm');
      },
    });
  });

  return (
    <Card className="case-action case-action--report">
      <form onSubmit={onSubmit} className="report-algorithm">
        <Select
          label="Algorithm"
          options={options}
          name="shapeId"
          register={register}
        />

        {!!shapeId && (
          <TextArea
            label="Message"
            description="Please provide an explanation on what is wrong with the algorithm."
            name="message"
            register={register}
            errorMessage={formState.errors.message?.message}
            required
          />
        )}

        <div className="report-algorithm__buttons">
          <Button variant="secondary" onClick={close}>
            Cancel
          </Button>

          <Button
            variant="primary"
            type="submit"
            loading={mutation.isLoading}
            danger
          >
            Report
          </Button>
        </div>
      </form>
    </Card>
  );
};
