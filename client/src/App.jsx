import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import EmailDetailPage from './pages/EmailDetail.jsx';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/email/:id" element={<EmailDetailPage />} />
    </Routes>
  );
};

export default App;
