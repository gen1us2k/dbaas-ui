import React, { useMemo, useState } from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import { useTheme2 } from '@grafana/ui';
import K8sRegistration from './components/Kubernetes/K8sRegistration/K8sRegistration';
import theme from './theme';
import PageLayout from './components/PageLayout/PageLayout';
import DBClusterList from './components/DBCluster/DBClusterList/DBClusterList';
import Backups from './components/Backups/Backups';
import { StoreContext, StoreContextProps } from './components/constants';

function App() {
  const grafanaTheme = useTheme2();
  const darkTheme = createTheme(theme(grafanaTheme));
  const [state, setState] = useState<{ k8sName:string }>({
    k8sName: '',
  });
  const store: StoreContextProps = useMemo(() => ({ state, update: setState }), [state, setState]);

  return (
    <ThemeProvider theme={darkTheme}>
      <StoreContext.Provider value={store}>
        <BrowserRouter>
          <PageLayout>
            <Routes>
              <Route path="k8s-registration" element={<K8sRegistration />} />
              <Route path="dbclusters-list" element={<DBClusterList />} />
              <Route path="backups" element={<Backups />} />
            </Routes>
          </PageLayout>
        </BrowserRouter>
      </StoreContext.Provider>
    </ThemeProvider>
  );
}

export default App;
