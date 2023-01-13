import React, {useEffect, useState} from 'react';

function DeploymentList() {
  const [data] = useState();
  useEffect(() => {
    const kubernetesClusterName = 'minikube';
    const serverUrl = `http://localhost:8080/proxy/${kubernetesClusterName}`;
    const namespace = 'default';
    const dataFetch = async() => {
      const data = await getDeployments(serverUrl, namespace);
      console.log(data)
    }
    dataFetch()
  })
  return <h3> FUCK </h3>
}
async function getDeployments(server:string, namespace:string) {
  const response = await fetch(`${server}/apis/apps/v1/namespaces/${namespace}/deployments`, {
    method: 'get',
  });
  return response
}
export default DeploymentList;
