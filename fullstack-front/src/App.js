import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import IAChat from './components/IAChat';

const App = () => (
  <Router>
    <Layout>
      <Routes>
        <Route path="/ia-chat" element={<IAChat />} />
        <Route path="/" element={<h2>Bem-vindo ao sistema integrado com IA!</h2>} />
      </Routes>
    </Layout>
  </Router>
);

export default App;