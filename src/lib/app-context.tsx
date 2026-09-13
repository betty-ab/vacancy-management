// src/lib/app-context.tsx
import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { api } from '@/lib/api';
import { type Candidate, type ApplicationStatus } from './data';

interface AppContextValue {
  page: string;
  params: Record<string, string>;
  navigate: (page: string, params?: Record<string, string>) => void;
  hrMode: boolean;
  setHrMode: (v: boolean) => void;
  candidates: Candidate[];
  loading: boolean;
  refreshCandidates: () => Promise<void>;
  updateCandidateStatus: (id: string, status: ApplicationStatus) => Promise<void>;
  addCandidateNote: (id: string, text: string) => Promise<void>;
  addCandidate: (c: Candidate) => void;
  selectedCandidateId: string | null;
  setSelectedCandidateId: (id: string | null) => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState('home');
  const [params, setParams] = useState<Record<string, string>>({});
  const [hrMode, setHrMode] = useState(false);
  const [selectedCandidateId, setSelectedCandidateId] = useState<string | null>(null);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);

  // Load candidates from API
  const refreshCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.getCandidates();
      setCandidates(data);
    } catch (error) {
      console.error('Failed to load candidates:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    refreshCandidates();
  }, [refreshCandidates]);

  const navigate = useCallback((newPage: string, newParams: Record<string, string> = {}) => {
    setPage(newPage);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const updateCandidateStatus = useCallback(async (id: string, status: ApplicationStatus) => {
    try {
      await api.updateCandidateStatus(id, status);
      await refreshCandidates(); // Refresh the list
    } catch (error) {
      console.error('Failed to update status:', error);
      throw error;
    }
  }, [refreshCandidates]);

  const addCandidateNote = useCallback(async (id: string, text: string) => {
    try {
      await api.addCandidateNote(id, text);
      await refreshCandidates(); // Refresh the list
    } catch (error) {
      console.error('Failed to add note:', error);
      throw error;
    }
  }, [refreshCandidates]);

  const addCandidate = useCallback((c: Candidate) => {
    // The API already adds the candidate, so we just refresh
    refreshCandidates();
  }, [refreshCandidates]);

  return (
    <AppContext.Provider
      value={{
        page,
        params,
        navigate,
        hrMode,
        setHrMode,
        candidates,
        loading,
        refreshCandidates,
        updateCandidateStatus,
        addCandidateNote,
        addCandidate,
        selectedCandidateId,
        setSelectedCandidateId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}