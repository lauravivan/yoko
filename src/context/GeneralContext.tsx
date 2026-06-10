import { createContext, useContext, useState, type ReactNode } from 'react';

interface GeneralContextType {
  isTaskOpen: boolean;
  toggleTask: () => void;
}

const GeneralContext = createContext<GeneralContextType>({
  isTaskOpen: false,
  toggleTask: () => {},
});

export const useGeneral = () => useContext(GeneralContext);

export const GeneralProvider = ({ children }: { children: ReactNode }) => {
  const [isTaskOpen, setIsTaskOpen] = useState(false);

  const toggleTask = () => {
    setIsTaskOpen((task) => !task);
  };

  return (
    <GeneralContext.Provider value={{ toggleTask, isTaskOpen }}>
      {children}
    </GeneralContext.Provider>
  );
};
