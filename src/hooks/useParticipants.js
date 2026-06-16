import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'workshop_participants';

function loadParticipants() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveParticipants(participants) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(participants));
  } catch {
    // Storage may be unavailable (private browsing, quota, etc.) — fail silently.
  }
}

export function useParticipants() {
  const [participants, setParticipants] = useState(loadParticipants);

  useEffect(() => {
    saveParticipants(participants);
  }, [participants]);

  const addParticipant = useCallback((data) => {
    const email = data.email.trim().toLowerCase();
    const isDuplicate = participants.some((p) => p.email.toLowerCase() === email);

    if (isDuplicate) {
      return { success: false, error: 'duplicate' };
    }

    const participant = {
      id: crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      name: data.name.trim(),
      email: data.email.trim(),
      workshop: data.workshop,
      registeredAt: new Date().toISOString(),
    };

    setParticipants((prev) => [participant, ...prev]);
    return { success: true, participant };
  }, [participants]);

  const removeParticipant = useCallback((id) => {
    setParticipants((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setParticipants([]);
  }, []);

  return {
    participants,
    addParticipant,
    removeParticipant,
    clearAll,
    count: participants.length,
  };
}
