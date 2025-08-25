import React from 'react';

const ReceivingChain = ({ chain }) => {
  if (!chain || chain.length === 0) return <p>No receiving chain data available.</p>;

  return (
    <div
      style={{
        maxHeight: 300,
        overflowY: 'auto',
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 6,
        fontFamily: 'monospace',
        whiteSpace: 'pre-wrap',
      }}>
      <ul style={{ paddingLeft: 20}}>
        {chain.map((hop, i) => {
          const parts = hop.split(/ by | from | with | envelope-from | tls /i).filter(Boolean);
          return (
            <li key={i} style={{ marginBottom: 12, lineHeight: '1.4em' }}>
              <ul style={{ listStyleType: 'none', paddingLeft: 12, marginTop: 4 }}>
                {parts.map((part, idx) => (
                  <li key={idx} style={{ color: '#444', fontFamily: 'monospace', fontSize: '0.9em' }}>
                    {part.trim()}
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>

    </div>
  );
};

export default ReceivingChain;
