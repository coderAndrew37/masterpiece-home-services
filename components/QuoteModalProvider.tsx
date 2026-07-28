'use client';

import React, { createContext, useCallback, useContext, useRef, useState } from 'react';

interface QuoteModalContextValue {
  isOpen: boolean;
  serviceHint?: string;
  openModal: (serviceHint?: string) => void;
  closeModal: () => void;
  triggerRef: React.MutableRefObject<HTMLElement | null>;
}

const QuoteModalContext = createContext<QuoteModalContextValue | null>(null);

export function QuoteModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [serviceHint, setServiceHint] = useState<string | undefined>(undefined);
  const triggerRef = useRef<HTMLElement | null>(null);

  const openModal = useCallback((hint?: string) => {
    triggerRef.current = document.activeElement as HTMLElement;
    setServiceHint(hint);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    triggerRef.current?.focus?.();
  }, []);

  return (
    <QuoteModalContext.Provider value={{ isOpen, serviceHint, openModal, closeModal, triggerRef }}>
      {children}
    </QuoteModalContext.Provider>
  );
}

export function useQuoteModal() {
  const ctx = useContext(QuoteModalContext);
  if (!ctx) {
    throw new Error('useQuoteModal must be used within a QuoteModalProvider');
  }
  return ctx;
}