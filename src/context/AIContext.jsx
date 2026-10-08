import React, { createContext, useContext, useState, useCallback } from 'react';

const AIContext = createContext(null);

export function AIProvider({ children }) {
  const [isAIPanelOpen, setIsAIPanelOpen] = useState(false);
  const [initialAIQuery, setInitialAIQuery] = useState('');

  const openAIPanel = useCallback((query = '') => {
    setInitialAIQuery(query || '');
    setIsAIPanelOpen(true);
  }, []);

  const closeAIPanel = useCallback(() => {
    setIsAIPanelOpen(false);
  }, []);

  const toggleAIPanel = useCallback(() => {
    setIsAIPanelOpen(prev => !prev);
  }, []);

  return (
    <AIContext.Provider value={{
      isAIPanelOpen,
      openAIPanel,
      closeAIPanel,
      toggleAIPanel,
      initialAIQuery,
      setInitialAIQuery
    }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) {
    return {
      isAIPanelOpen: false,
      openAIPanel: () => {},
      closeAIPanel: () => {},
      toggleAIPanel: () => {},
      initialAIQuery: ''
    };
  }
  return ctx;
}
