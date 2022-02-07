import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface UseStatePromiseFn {
  <T>(initialState: T | (() => T), skipFirst?: boolean): readonly [
    T,
    (value: SetStateAction<T>) => Promise<T>,
    Dispatch<SetStateAction<T>>
  ];
  <T = undefined>(skipFirst?: boolean): readonly [
    T | undefined,
    (value: SetStateAction<T | undefined>) => Promise<T | undefined>,
    Dispatch<SetStateAction<T | undefined>>
  ];
}

export const useStatePromise: UseStatePromiseFn = <T>(
  initialState?: T,
  skipFirst = true
) => {
  const [state, setState] = useState(initialState);
  const first = useRef(skipFirst);
  const resolver = useRef<((value: T | undefined) => void) | null>(null);

  const setStatePromise = useCallback(
    (value: SetStateAction<T | undefined>) => {
      setState(value);
      return new Promise<T | undefined>((resolve) => {
        resolver.current = resolve;
      });
    },
    []
  );

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (resolver.current) {
      resolver.current(state);
      resolver.current = null;
    }
  }, [state]);

  return [state, setStatePromise, setState] as const;
};

export default useStatePromise;
