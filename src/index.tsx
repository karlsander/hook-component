export default function Hook({
  hook,
  args,
  children
}: {
  hook: Function;
  args?: any[];
  children?: ((...args: any[]) => React.ReactNode) | React.ReactNode;
}) {
  const hookReturn = hook(...(args ? args : []));
  if (typeof children === "function") {
    return children(hookReturn);
  } else if (children) {
    return children;
  } else {
    return null;
  }
}

export function createHookComponent<T extends (...args: any[]) => any>(
  hook: T
) {
  return function Hook({
    args,
    children
  }: {
    args: Parameters<T>;
    children?: ((args: ReturnType<T>) => React.ReactNode) | React.ReactNode;
  }) {
    const hookReturn = hook(...args);
    if (typeof children === "function") {
      return children(hookReturn);
    } else if (children) {
      return children;
    } else {
      return null;
    }
  };
}
