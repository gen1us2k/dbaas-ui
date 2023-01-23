import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useTheme2 } from '@grafana/ui';
import K8sRegistration from './components/Kubernetes/K8sRegistration/K8sRegistration';
import theme from './theme';
import PageLayout from './components/PageLayout/PageLayout';
import DBClusterList from './components/DBCluster/DBClusterList/DBClusterList';
import Backups from './components/Backups/Backups';

function App() {
  const grafanaTheme = useTheme2();
  const darkTheme = createTheme(theme(grafanaTheme));
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <PageLayout>
          <Routes>
            <Route path="k8s-registration" element={<K8sRegistration />} />
            <Route path="dbclusters-list" element={<DBClusterList />} />
            <Route path="backups" element={<Backups />} />
          </Routes>
        </PageLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
