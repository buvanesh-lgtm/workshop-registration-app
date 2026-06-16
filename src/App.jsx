import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import { useParticipants } from './hooks/useParticipants';

export default function App() {
  const { participants, addParticipant, removeParticipant, clearAll, count } = useParticipants();
  const [confirmedParticipant, setConfirmedParticipant] = useState(null);
  const [toast, setToast] = useState(null);

  const handleRegister = (data) => {
    const result = addParticipant(data);

    if (result.success) {
      setConfirmedParticipant(result.participant);
    } else if (result.error === 'duplicate') {
      showToast('This email address is already registered!', 'error');
    }

    return result;
  };

  const handleRemove = (id) => {
    const p = participants.find((p) => p.id === id);
    removeParticipant(id);
    if (p) {
      showToast(`${p.name} has been removed from the list.`, 'info');
    }
  };

  const handleClearAll = () => {
    if (participants.length === 0) return;
    const count = participants.length;
    clearAll();
    showToast(`All ${count} registrations have been cleared.`, 'warning');
  };

  const showToast = (message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <div className="app">
      <Header participantCount={count} />

      <main className="app__main" id="main-content">
        <div className="app__grid">
          <div className="app__col app__col--form">
            <RegistrationForm onRegister={handleRegister} />
          </div>

          <div className="app__col app__col--list">
            <ParticipantList
              participants={participants}
              onRemove={handleRemove}
              onClearAll={handleClearAll}
            />
          </div>
        </div>
      </main>

      <footer className="app__footer" id="footer">
        <p className="app__footer-text">
          Workshop Registration System &copy; {new Date().getFullYear()} &middot; Data stored locally in your browser
        </p>
      </footer>

      {/* Confirmation Modal */}
      {confirmedParticipant && (
        <ConfirmationModal
          participant={confirmedParticipant}
          onClose={() => setConfirmedParticipant(null)}
        />
      )}

      {/* Toast Notifications */}
      {toast && (
        <div className={`toast toast--${toast.type}`} key={toast.id} id="toast-notification">
          <div className="toast__icon">
            {toast.type === 'error' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            )}
            {toast.type === 'info' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="16" x2="12" y2="12" />
                <line x1="12" y1="8" x2="12.01" y2="8" />
              </svg>
            )}
            {toast.type === 'warning' && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            )}
          </div>
          <span className="toast__message">{toast.message}</span>
          <button className="toast__close" onClick={() => setToast(null)} aria-label="Dismiss">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
