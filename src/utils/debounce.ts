export const debounce = <F extends (...args: any[]) => void>(
  func: F,
  delay: number
): F => {
  let timeoutId: NodeJS.Timeout;

  return function (this: any, ...args: Parameters<F>) {
    const context = this;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(context, args), delay);
  } as any;
};
