import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import AppRoutes from './routes';
import { AuthProvider } from './contexts/AuthContext';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;