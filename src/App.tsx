import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage';
import ProcessingPage from './pages/ProcessingPage';
import DashboardPage from './pages/DashboardPage';
import HistoryPage from './pages/HistoryPage';
import { EncodingProvider } from './context/EncodingContext';

function App() {
  return (
    <EncodingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<UploadPage />} />
            <Route path="/processing/:jobId" element={<ProcessingPage />} />
            <Route path="/dashboard/:jobId" element={<DashboardPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
        <Toaster position="top-right" />
      </Router>
    </EncodingProvider>
  );
}

export default App;