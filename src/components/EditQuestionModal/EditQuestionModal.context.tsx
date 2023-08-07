import { createContext, ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface EditQuestionModalContextData {
  subjectId: string;
  questionId: string;
}

interface EditQuestionModalContextState {
  openModal: (data: EditQuestionModalContextData) => void;
  closeModal: () => void;
  data: EditQuestionModalContextData | null;
}

const EditQuestionModalContext = createContext<EditQuestionModalContextState | null>(null);

export const useEditQuestionModalContext = () => {
  const context = useContext(EditQuestionModalContext);

  if (context === null) {
    throw new Error('EditQuestionModalContext not initialized!');
  }

  return context;
};

interface EditQuestionModalProviderProps {
  children: ReactNode;
}
export const EditQuestionModalProvider = ({ children }: EditQuestionModalProviderProps) => {
  const [data, setData] = useState<EditQuestionModalContextData | null>(null);
  const openModal = useCallback((newData: EditQuestionModalContextData) => {
    setData(newData);
  }, []);
  const closeModal = useCallback(() => {
    setData(null);
  }, []);

  const value = useMemo(
    (): EditQuestionModalContextState => ({
      data,
      openModal,
      closeModal,
    }),
    [closeModal, data, openModal],
  );

  return <EditQuestionModalContext.Provider value={value}>{children}</EditQuestionModalContext.Provider>;
};
