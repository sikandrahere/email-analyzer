import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const EmailList = ({ emails }) => {
  const location = useLocation();

  if (!emails || emails.length === 0) return <p>No emails found.</p>;

  return (
    <ul style={{ listStyle: 'none', padding: 0 }}>
      {emails.map(email => (
        <li
          key={email._id}
          style={{ borderBottom: '1px solid #ddd', padding: 10, cursor: 'pointer' }}>
          <Link
            to={`/email/${email._id}`}
            state={{ background: location }}
            style={{ textDecoration: 'none', color: '#333' }}>
            <strong>{email.subject || '(No Subject)'}</strong>
            <br />
            <small>From: {email.from}</small>
            <br />
            <small>{new Date(email.receivedAt).toLocaleString()}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default EmailList;
