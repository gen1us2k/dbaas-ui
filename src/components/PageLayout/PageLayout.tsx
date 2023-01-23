import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import {
  Hive, Storage, Backup, MonitorHeart,
} from '@mui/icons-material';
import { MenuItemType } from './PageLayout.types';
import Navigation from './Navigation/Navigation';
import { pmmHome } from '../constants';

interface PageLayoutProps {
  children: ReactNode,
}

const StyledWrapper = styled('div')`
  padding: 40px 20px;
  flex: auto;
`;

const Layout = styled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100vh',
  }),
);

function PageLayout({ children }: PageLayoutProps) {
  const menuItems: MenuItemType[] = [{
    name: 'Kubernetes clusters',
    icon: <Hive />,
    link: 'k8s-registration',
  }, {
    name: 'Database clusters',
    icon: <Storage />,
    link: 'dbclusters-list',
  }, {
    name: 'Backups',
    icon: <Backup />,
    link: 'backups',
  },
  {
    name: 'Monitoring',
    icon: <MonitorHeart />,
    ext: true,
    link: `${pmmHome}/graph/d/pmm-qan/pmm-query-analytics`,
  }];

  return (
    <Layout>
      <Navigation menuItems={menuItems} />
      <StyledWrapper>
        {children}
      </StyledWrapper>
    </Layout>
  );
}

export default PageLayout;
