import { useProgressBar } from '@react-aria/progress';

type ProgressBarProps = {
  label: string;
  showLabel?: boolean;
  value: number;
  minValue?: number;
  maxValue?: number;
};

export const ProgressBar = ({
  label,
  showLabel = false,
  value,
  minValue = 0,
  maxValue = 100,
}: ProgressBarProps) => {
  const { progressBarProps, labelProps } = useProgressBar({
    label,
    'aria-label': label,
    value,
    minValue,
    maxValue,
  });

  const width = (value / maxValue) * 100;

  return (
    <div {...progressBarProps} className="progress-bar">
      {showLabel && (
        <div className="progress-bar__label">
          <span {...labelProps}>{label}</span>
          <span>{Math.floor(width)}%</span>
        </div>
      )}

      <div className="progress-bar__background">
        <div
          className="progress-bar__foreground"
          style={{ width: `${width}%` }}
        ></div>
      </div>
    </div>
  );
};
