import {
  CheckCircleIcon,
  ExclamationCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  SpeakerphoneIcon,
} from '@heroicons/react/outline';
import { Theme, TypeOptions } from 'react-toastify';

type ToastIconProps = {
  theme?: Theme;
  type?: TypeOptions;
};

export const ToastIcon = ({ type }: ToastIconProps) => {
  if (type === 'success') return <CheckCircleIcon />;
  if (type === 'info') return <InformationCircleIcon />;
  if (type === 'warning') return <ExclamationIcon />;
  if (type === 'error') return <ExclamationCircleIcon />;

  return <SpeakerphoneIcon />;
};
