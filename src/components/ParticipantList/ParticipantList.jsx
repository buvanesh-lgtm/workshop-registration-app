import './ParticipantList.css';

function formatDate(iso) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function getInitials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('');
}

export default function ParticipantList({ participants, onRemove, onClearAll }) {
  return (
    <div className="card participant-list">
      <div className="participant-list__header">
        <h2 className="participant-list__title">
          Registered Participants
          <span className="participant-list__badge">{participants.length}</span>
        </h2>
        {participants.length > 0 && (
          <button className="participant-list__clear" onClick={onClearAll}>
            Clear All
          </button>
        )}
      </div>

      {participants.length === 0 ? (
        <div className="participant-list__empty">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <p>No one has registered yet.</p>
          <span>New registrations will appear here.</span>
        </div>
      ) : (
        <ul className="participant-list__items">
          {participants.map((p) => (
            <li className="participant-item" key={p.id}>
              <div className="participant-item__avatar">{getInitials(p.name)}</div>
              <div className="participant-item__info">
                <p className="participant-item__name">{p.name}</p>
                <p className="participant-item__email">{p.email}</p>
                <p className="participant-item__meta">
                  {p.workshop} &middot; {formatDate(p.registeredAt)}
                </p>
              </div>
              <button
                className="participant-item__remove"
                onClick={() => onRemove(p.id)}
                aria-label={`Remove ${p.name}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
