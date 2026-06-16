import { useState } from 'react';
import './RegistrationForm.css';

const WORKSHOPS = [
  'Full Stack Java Development',
  'React & Modern Frontend',
  'Data Structures & Algorithms',
  'Cloud & DevOps Fundamentals',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegistrationForm({ onRegister }) {
  const [form, setForm] = useState({ name: '', email: '', workshop: WORKSHOPS[0] });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next = {};
    if (!form.name.trim()) {
      next.name = 'Name is required.';
    } else if (form.name.trim().length < 2) {
      next.name = 'Name must be at least 2 characters.';
    }

    if (!form.email.trim()) {
      next.email = 'Email is required.';
    } else if (!EMAIL_PATTERN.test(form.email.trim())) {
      next.email = 'Enter a valid email address.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    const result = onRegister(form);

    if (result.success) {
      setForm({ name: '', email: '', workshop: WORKSHOPS[0] });
      setErrors({});
    } else if (result.error === 'duplicate') {
      setErrors({ email: 'This email is already registered.' });
    }
    setSubmitting(false);
  };

  return (
    <div className="reg-form card">
      <h2 className="reg-form__title">Register for a Workshop</h2>
      <p className="reg-form__subtitle">Fill in your details to secure your spot.</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="name" className="field__label">Full Name</label>
          <input
            id="name"
            type="text"
            className={`field__input ${errors.name ? 'field__input--error' : ''}`}
            placeholder="Jane Doe"
            value={form.name}
            onChange={handleChange('name')}
            autoComplete="name"
          />
          {errors.name && <span className="field__error">{errors.name}</span>}
        </div>

        <div className="field">
          <label htmlFor="email" className="field__label">Email Address</label>
          <input
            id="email"
            type="email"
            className={`field__input ${errors.email ? 'field__input--error' : ''}`}
            placeholder="jane@example.com"
            value={form.email}
            onChange={handleChange('email')}
            autoComplete="email"
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>

        <div className="field">
          <label htmlFor="workshop" className="field__label">Workshop</label>
          <select
            id="workshop"
            className="field__input field__select"
            value={form.workshop}
            onChange={handleChange('workshop')}
          >
            {WORKSHOPS.map((w) => (
              <option key={w} value={w}>{w}</option>
            ))}
          </select>
        </div>

        <button type="submit" className="reg-form__submit" disabled={submitting}>
          {submitting ? 'Registering…' : 'Register'}
        </button>
      </form>
    </div>
  );
}
