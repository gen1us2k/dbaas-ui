import React, { useContext } from 'react';
import {
  Button, Field, Form, Input, Legend, TextArea,
} from '@grafana/ui';
import KubernetesService from '../Kubernetes.service';
import { StoreContext } from '../../constants';

interface FormValues {
  name?: string;
  k8config?: string;
}
function K8sRegistration() {
  const { update } = useContext(StoreContext);
  const onSubmit = async ({ k8config, name }: FormValues) => {
    const base64Config = btoa(unescape(encodeURIComponent(JSON.stringify(k8config))));
    KubernetesService.registerK8sCluster(base64Config, name || 'minikube');
    if (update) {
      update((prevState) => ({ ...prevState, k8sName: name || 'minikube' }));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
    >
      {({ formState, register }) => (
        <>
          <Legend style={{ color: 'white' }}>Register K8s Cluster</Legend>
          <Field>
            <Input
              placeholder="kubernetes cluster name"
              {...register('name')}
            />
          </Field>
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
      )}
    </Form>
  );
}

export default K8sRegistration;
