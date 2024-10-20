'use client';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

export const queryClient: QueryClient = new QueryClient();

export const ReactQueryProvider = ({
  children,
}: React.PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};
