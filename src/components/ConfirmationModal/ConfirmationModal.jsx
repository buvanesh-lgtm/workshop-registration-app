import { useEffect } from 'react';
import './ConfirmationModal.css';

export default function ConfirmationModal({ participant, onClose }) {
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirmation-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" style={{ strokeDasharray: 50 }} className="modal__check" />
          </svg>
        </div>

        <h2 id="confirmation-title" className="modal__title">You're Registered!</h2>
        <p className="modal__subtitle">A confirmation has been recorded for:</p>

        <div className="modal__details">
          <div className="modal__detail-row">
            <span className="modal__detail-label">Name</span>
            <span className="modal__detail-value">{participant.name}</span>
          </div>
          <div className="modal__detail-row">
            <span className="modal__detail-label">Email</span>
            <span className="modal__detail-value">{participant.email}</span>
          </div>
          <div className="modal__detail-row">
            <span className="modal__detail-label">Workshop</span>
            <span className="modal__detail-value">{participant.workshop}</span>
          </div>
        </div>

        <button className="modal__close" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
