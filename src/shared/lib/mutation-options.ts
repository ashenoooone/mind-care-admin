import type { DefaultError } from '@tanstack/query-core';
import type { UseMutationOptions } from '@tanstack/react-query';

export function mutationOptions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Func extends (args: any) => void,
  TError = DefaultError,
  TContext = unknown,
>(
  options: UseMutationOptions<
    AwaitedFuncReturnType<Func>,
    TError,
    Parameters<Func>[0],
    TContext
  >
): UseMutationOptions<
  AwaitedFuncReturnType<Func>,
  TError,
  Parameters<Func>[0],
  TContext
> {
  return options;
}
