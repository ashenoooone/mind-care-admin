type AwaitedFuncReturnType<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Func extends (args: any) => any,
> = Awaited<ReturnType<Func>>;
