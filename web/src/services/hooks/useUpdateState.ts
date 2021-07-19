import { useState } from 'react';

export type TUpdateStateData<T> = Partial<T> | ((state: T) => Partial<T>);
export const useUpdateState = <T extends {}>(initState: T) => {
  const [state, setState] = useState<T>(initState);
  const updateState = (data: TUpdateStateData<T>) =>
    setState((s) => ({
      ...s,
      ...(typeof data === 'function' ? data(s) : data),
    }));
  return { state, updateState };
};
