import React, { useEffect, useState } from 'react';
import EmailList from '../components/EmailList.jsx';
import { getEmails, fetchNewEmails } from '../api/emailApi.js';

const VITE_TEST_EMAIL_ADDRESS = import.meta.env.VITE_TEST_EMAIL_ADDRESS;
const VITE_TEST_EMAIL_SUBJECT = import.meta.env.VITE_TEST_EMAIL_SUBJECT;

const Home = () => {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadEmails();
  }, []);

const loadEmails = async () => {
  setLoading(true);
  setError(null);
  try {
    await fetchNewEmails();
    const emails = await getEmails();
    setEmails(emails); 
  } catch (err) {
    setError('Failed to load emails.');
  } finally {
    setLoading(false);
  }
};


  return (
    <div style={{ maxWidth: 900, margin: 'auto', padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1>Email Receiving Chain & ESP Analysis</h1>
      <p>
        <strong>Send test emails to:</strong> <code>{VITE_TEST_EMAIL_ADDRESS}</code><br />
        <strong>Subject line:</strong> <code>{VITE_TEST_EMAIL_SUBJECT}</code>
      </p>
      <button onClick={loadEmails} disabled={loading} style={{ marginBottom: 20 }}>
        {loading ? 'Loading...' : 'Refresh Emails'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <EmailList emails={emails} />
    </div>
  );
};

export default Home;
