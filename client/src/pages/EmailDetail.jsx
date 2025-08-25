import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getEmailById } from '../api/emailApi.js';
import ReceivingChain from '../components/ReceivingChain.jsx';
import ESPBadge from '../components/ESPBade.jsx';

const EmailDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getEmailById(id)
      .then(data => {
        setEmail(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch email details.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading email details...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!email) return <p>Email not found.</p>;

  return (
    <div
      style={{
        padding: 20,
        borderRadius: 8,
        backgroundColor: '#fff',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        maxWidth: 700,
        margin: 'auto',
        marginTop: 20,
      }}>
      <button onClick={() => navigate(-1)} style={{ marginBottom: 10 }}>
        ← Back
      </button>
      <h2>{email.subject || '(No Subject)'}</h2>
      <p>
        <strong>From:</strong> {email.from}
      </p>
      <p>
        <strong>ESP:</strong> <ESPBadge esp={email.espType} />
      </p>
      <h3>Receiving Chain</h3>
      <ReceivingChain chain={email.receivingChain} />
    </div>
  );
};

export default EmailDetailPage;
