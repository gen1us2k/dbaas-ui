import { DBClusterResponse } from "./DBClusterList/DBCluster.types";
import { serverProxyUrl } from "../constants";

export abstract class DBClusterService {
    static async getDbClusters(kubernetesClusterName: string, namespace: string): Promise<DBClusterResponse> {
        return fetch(`${serverProxyUrl}/${kubernetesClusterName}/apis/dbaas.percona.com/v1/namespaces/${namespace}/databaseclusters`, {
            method: 'get',
        }).then((value) => {
            return Promise.resolve(value.json());
        });
    }

}
