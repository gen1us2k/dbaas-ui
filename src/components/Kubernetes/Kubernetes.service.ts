import { serverUrl } from "../constants";

export abstract class KubernetesService {

    static async registerK8sCluster(config: string, clusterName: string): Promise<any> {
        return fetch(`${serverUrl}/k8s`, {
            method: 'post',
            body:  JSON.stringify({
                name: clusterName,
                kubeconfig: config,
            }),
        }).then((value) => {
            return value.json();
        });
    }

}
