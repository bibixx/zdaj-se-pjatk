import { createContext, useContext } from 'react';

export const UpdatedAtContext = createContext<{
  updatedAt: number | undefined;
  setUpdatedAt: (newUpdatedAt: number | undefined) => void;
}>({
  updatedAt: undefined,
  setUpdatedAt: () => undefined,
});

export const useUpdatedAt = () => useContext(UpdatedAtContext);
