import { DBClusterResponse } from './DBClusterList/DBCluster.types';
import { serverProxyUrl } from '../constants';

abstract class DBClusterService {
  static async getDbClusters(kubernetesClusterName: string, namespace: string): Promise<DBClusterResponse> {
    // eslint-disable-next-line max-len
    return fetch(`${serverProxyUrl}/${kubernetesClusterName}/apis/dbaas.percona.com/v1/namespaces/${namespace}/databaseclusters`, {
      method: 'get',
    }).then((value) => Promise.resolve(value.json()));
  }
}
export default DBClusterService;
