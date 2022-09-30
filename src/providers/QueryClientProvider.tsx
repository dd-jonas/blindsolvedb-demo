import { FC } from 'react';
import { QueryClient, QueryClientProvider as Provider } from 'react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked',
      retry: false,
    },
  },
});

export const QueryClientProvider: FC = ({ children }) => {
  return <Provider client={queryClient}>{children}</Provider>;
};
