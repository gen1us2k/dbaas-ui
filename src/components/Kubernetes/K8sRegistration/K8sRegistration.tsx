import React, {FC} from 'react';
import {Button, Field, Form, Legend, TextArea} from "@grafana/ui";
import {KubernetesService} from "../Kubernetes.service";

export const K8sRegistration: FC = () => {
    const onSubmit = (data: any ) => {
        const config = data?.k8config;
        console.log(config);
        const base64Config = btoa(unescape(encodeURIComponent(JSON.stringify(config))));
        console.log(base64Config);
        KubernetesService.registerK8sCluster(base64Config, "minikube");
    }

    return (
        <div>
            <Form
            onSubmit={onSubmit}>
                {({ formState, register }) =>
                    (
                        <>
                            <Legend>Register K8s Cluster</Legend>
                            <Field>
                                <TextArea
                                    rows={3}
                                    placeholder="kube config"
                                    {...register('k8config')}
                                />
                            </Field>
                            <Button type="submit" disabled={formState.isSubmitting}>
                                Submit
                            </Button>
                        </>
                      )
                    }
                  </Form>
        </div>
    );
}

export default K8sRegistration;
