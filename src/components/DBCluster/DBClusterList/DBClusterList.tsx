import React, { useContext, useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import {
  Paper, TableBody, TableCell, TableContainer, TableRow, TableHead,
} from '@mui/material';
import DBClusterService from '../DBCluster.service';
import { namespace, StoreContext } from '../../constants';
import { DBClusterResponse } from './DBCluster.types';
import { DatabaseOperators } from '../../common.types';

type DBCluster = {
  name: string,
  database: string,
  parameters: Parameters,
  status: string,
};

interface Parameters {
  k8sClusterName: string,
  cpu: string,
  memory: string,
  disk: string,
  storageClass: string,
  expose: string,
}

const getDatabaseVersion = (databaseImage: string): string => databaseImage.split(':')[1]?.split('-')[0] || '';

const prepareDBClusters = (response: DBClusterResponse): DBCluster[] => response.items.map((item) => ({
  name: item?.metadata?.name || '-',
  database: `${DatabaseOperators[item?.spec?.databaseType]} ${getDatabaseVersion(item?.spec?.databaseImage)}`,
  parameters: {
    k8sClusterName: '-',
    cpu: item?.spec?.dbInstance?.cpu || '-',
    memory: item?.spec?.dbInstance?.memory || '-',
    disk: item?.spec?.dbInstance?.diskSize || '-',
    storageClass: item?.spec?.dbInstance?.storageClassName || '-',
    expose: '-',
  },
  status: item?.status?.status || '-',
}));
function DBClusterList() {
  const [dbClusters, setDBClusters] = useState<DBCluster[]>([]);

  const context = useContext(StoreContext);

  useEffect(() => {
    DBClusterService.getDbClusters(context?.state?.k8sName || 'minikube', namespace).then((result) => {
      setDBClusters(prepareDBClusters(result));
    });
  }, []);

  return (
    <TableContainer
      component={Paper}
      style={{ backgroundColor: 'rgb(17, 18, 23)', padding: '40px 20px', width: 'auto' }}
    >
      <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{ backgroundColor: '#181b1f', color: 'white' }}>
        <TableHead>
          <TableCell align="left">Name</TableCell>
          <TableCell align="left">Database</TableCell>
          <TableCell align="left">Connection</TableCell>
          <TableCell align="left">DB Cluster Parameters</TableCell>
          <TableCell align="left">Cluster Status</TableCell>
          <TableCell align="left">Action</TableCell>
        </TableHead>
        <TableBody>
          {dbClusters.map((row) => (
            <TableRow
              key={row.name}
            >
              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">{row.name}</TableCell>
              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">{row.database}</TableCell>
              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">-</TableCell>
              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">
                <div>
                  K8s cluster name:
                  {row.parameters.k8sClusterName}
                </div>
                <div>
                  CPU:
                  {row.parameters.cpu}
                </div>
                <div>
                  Memory:
                  {row.parameters.memory}
                </div>
                <div>
                  Disk Size:
                  {row.parameters.disk}
                </div>
                <div>
                  Storage Class:
                  {row.parameters.storageClass}
                </div>
                <div>
                  Expose:
                  {row.parameters.expose}
                </div>
                <div />
              </TableCell>

              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">{row.status}</TableCell>
              <TableCell style={{ color: 'rgba(204, 204, 220, 1)' }} align="left">-</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DBClusterList;
