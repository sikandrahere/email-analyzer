import React from 'react';

const espColors = {
  Gmail: '#D93025',
  Outlook: '#0078D4',
  'Amazon SES': '#FF9900',
  Zoho: '#14A9B6',
  Unknown: '#777777',
};

const ESPBade = ({ esp }) => {
  const color = espColors[esp] || espColors.Unknown;

  return (
    <span
      style={{
        backgroundColor: color,
        color: 'white',
        padding: '4px 12px',
        borderRadius: 20,
        fontWeight: 'bold',
        fontSize: 14,
        display: 'inline-block',
        minWidth: 90,
        textAlign: 'center',
      }}>
      {esp}
    </span>
  );
};

export default ESPBade;
