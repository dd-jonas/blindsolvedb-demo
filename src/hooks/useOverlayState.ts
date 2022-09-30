import { useState } from 'react';

export const useOverlayState = (initial = false) => {
  const [isOpen, setOpen] = useState(initial);

  return {
    isOpen,
    isClosed: !isOpen,
    open: () => setOpen(true),
    close: () => setOpen(false),
  };
};
