'use client';

import {
  QueryClient,
  QueryClientProvider,
} from 'react-query';

const queryClient: QueryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
