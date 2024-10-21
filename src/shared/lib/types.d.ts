type AwaitedFuncReturnType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Func extends (args: any) => any,
> = Awaited<ReturnType<Func>>;

type WithPaginationParams = {
  page: number;
  count: number;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FuncFirstParameter<Func extends (args: any) => any> =
  Parameters<Func>[0];

type PaginatedResult<TData> = {
  data: TData;
  meta: {
    totalPages: number;
    totalItems: number;
    currentPage: number;
    nextPage: number;
    previousPage: number;
    hasNextPage: boolean;
  };
};
