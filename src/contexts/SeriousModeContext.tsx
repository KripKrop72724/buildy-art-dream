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
  const [isSeriousMode, setIsSeriousMode] = useState(false);

  useEffect(() => {
    try { localStorage.setItem('buildcare-serious-mode', 'false'); } catch {}
    document.body.classList.remove('serious-mode');
  }, [isSeriousMode]);

  const toggleSeriousMode = () => {
    // Temporarily disabled
    console.debug('Serious mode is temporarily disabled');
  };

  const setSeriousMode = (serious: boolean) => {
    // Temporarily disabled
    console.debug('Serious mode set request ignored:', serious);
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