import { useEffect } from 'react';

const SITE_NAME = 'BlindsolveDB';

export const useDocumentTitle = (title: string) => {
  useEffect(() => {
    const oldTitle = document.title;
    document.title = `${title} – ${SITE_NAME}`;

    return () => {
      document.title = oldTitle;
    };
  }, [title]);
};
