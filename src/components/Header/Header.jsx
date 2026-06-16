import './Header.css';

export default function Header({ participantCount }) {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__brand">
          <span className="header__logo">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </span>
          <div className="header__titles">
            <h1 className="header__title">Workshop Registration</h1>
            <p className="header__subtitle">Sign up &amp; manage attendees</p>
          </div>
        </div>

        <div className="header__count" aria-live="polite">
          <span className="header__count-number">{participantCount}</span>
          <span className="header__count-label">
            {participantCount === 1 ? 'Registered' : 'Registered'}
          </span>
        </div>
      </div>
    </header>
  );
}
