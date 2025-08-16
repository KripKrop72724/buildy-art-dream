import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface SeriousModeContextType {
  isSeriousMode: boolean;
  toggleSeriousMode: () => void;
  setSeriousMode: (serious: boolean) => void;
}

const SeriousModeContext = createContext<SeriousModeContextType | undefined>(undefined);

interface SeriousModeProviderProps {
  children: ReactNode;
}

export const SeriousModeProvider = ({ children }: SeriousModeProviderProps) => {
  const [isSeriousMode, setIsSeriousMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('buildcare-serious-mode');
      return saved ? JSON.parse(saved) : false;
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('buildcare-serious-mode', JSON.stringify(isSeriousMode));
    
    // Add class to body for CSS targeting
    if (isSeriousMode) {
      document.body.classList.add('serious-mode');
    } else {
      document.body.classList.remove('serious-mode');
    }
  }, [isSeriousMode]);

  const toggleSeriousMode = () => {
    setIsSeriousMode(prev => !prev);
  };

  const setSeriousMode = (serious: boolean) => {
    setIsSeriousMode(serious);
  };

  return (
    <SeriousModeContext.Provider value={{
      isSeriousMode,
      toggleSeriousMode,
      setSeriousMode
    }}>
      {children}
    </SeriousModeContext.Provider>
  );
};

export const useSeriousMode = () => {
  const context = useContext(SeriousModeContext);
  if (context === undefined) {
    throw new Error('useSeriousMode must be used within a SeriousModeProvider');
  }
  return context;
};