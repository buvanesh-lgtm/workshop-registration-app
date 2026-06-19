import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import ParticipantList from './components/ParticipantList/ParticipantList';
import ConfirmationModal from './components/ConfirmationModal/ConfirmationModal';
import Toast from './components/Toast/Toast';
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
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
