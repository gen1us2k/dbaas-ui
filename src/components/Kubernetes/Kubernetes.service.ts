const serverProxyUrl = `http://localhost:8080/proxy`;
const serverUrl = 'http://localhost:8080';
export abstract class KubernetesService {

    static async getDeployments(kubernetesClusterName:string, namespace:string): Promise<any> {
        return fetch(`${serverProxyUrl}/${kubernetesClusterName}/apis/apps/v1/namespaces/${namespace}/deployments`, {
            method: 'get',
        }).then((value) => {
            return value.json();
        });
    }

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
