interface DBClusterItemManagedField {
    apiVersion: string,
    fieldsType: string,
    "fieldsV1": {
        "f:metadata": {
            "f:annotations": {
                ".": {},
                "f:dbaas.percona.com/managed-by": {}
            }
        },
        "f:spec": {
            ".": {},
            "f:backup": {
                ".": {},
                "f:resources": {}
            },
            "f:clusterSize": {},
            "f:databaseConfig": {},
            "f:databaseImage": {},
            "f:databaseType": {},
            "f:dbInstance": {
                ".": {},
                "f:cpu": {},
                "f:diskSize": {},
                "f:memory": {},
                "f:storageClassName": {}
            },
            "f:loadBalancer": {
                ".": {},
                "f:configuration": {},
                "f:image": {},
                "f:resources": {
                    ".": {},
                    "f:limits": {
                        ".": {},
                        "f:cpu": {},
                        "f:memory": {}
                    }
                },
                "f:size": {},
                "f:trafficPolicy": {},
                "f:type": {}
            },
            "f:monitoring": {
                ".": {},
                "f:pmm": {
                    ".": {},
                    "f:image": {},
                    "f:login": {},
                    "f:publicAddress": {}
                },
                "f:resources": {}
            },
            "f:secretsName": {}
        }
    },
    manager: string,
    operation: string, //enum?
    time: string,
}
// {
//     "apiVersion": "dbaas.percona.com/v1",
//     "fieldsType": "FieldsV1",
//     "fieldsV1": {
//     "f:status": {
//         ".": {},
//         "f:host": {},
//         "f:message": {},
//         "f:size": {},
//         "f:status": {}
//     }
// },
//     "manager": "manager",
//     "operation": "Update",
//     "subresource": "status",
//     "time": "2023-01-17T14:59:27Z"
// }
interface DBClusterItemMetadata {
        annotations: {
            "dbaas.percona.com/managed-by": "pmm"
        },
        "creationTimestamp": "2023-01-17T14:58:53Z",
        "generation": 1,
        managedFields: DBClusterItemManagedField[]
        name: string;
        namespace: string; //default
        resourceVersion: string;
        uid: string;
}
interface DBClusterItemSpec {
    "backup": {
        "resources": {}
    },
    "clusterSize": 1,
    "databaseConfig": "[mysqld]\nwsrep_provider_options=\"gcache.size=600M\"\nwsrep_trx_fragment_unit='bytes'\nwsrep_trx_fragment_size=3670016\n",
    "databaseImage": "percona/percona-xtradb-cluster:8.0.27-18.1",
    "databaseType": "pxc",
    "dbInstance": {
        "cpu": "1",
        "diskSize": "25G",
        "memory": "2G",
        "storageClassName": "standard"
    },
    "loadBalancer": {
        "configuration": "timeout client 28800s\ntimeout connect 100500\ntimeout server 28800s\n",
        "image": "percona/percona-xtradb-cluster-operator:1.11.0-haproxy",
        "resources": {
            "limits": {
                "cpu": "500m",
                "memory": "500M"
            }
        },
        "size": 1,
        "trafficPolicy": "Cluster",
        "type": "haproxy"
    },
    "monitoring": {
        "pmm": {
            "image": "percona/pmm-client:2.35.0",
            "login": "api_key",
            "publicAddress": "localhost"
        },
        "resources": {}
    },
    "secretsName": "dbaas-mysql-dashd3-pxc-secrets"
}
interface DBClusterItemStatus {
        "host": "mysql-dashd3-haproxy.default",
        "message": "pxc: pmm-client: Back-off pulling image \"percona/pmm-client:2.35.0\"; ;haproxy: pmm-client: Back-off pulling image \"percona/pmm-client:2.35.0\"; ",
        "size": 2,
        "status": "initializing";
}

interface DBClusterResponseItem {
    apiVersion: string;
    kind: string;  //"DatabaseCluster", ?
    metadata: DBClusterItemMetadata;
    spec: DBClusterItemSpec;
    status: DBClusterItemStatus;
}
export interface DBClusterResponse {
    apiVersion: string;
    items: DBClusterResponseItem[];
    kind: string;
    //"DatabaseClusterList",
//     "metadata": {
//     "continue": "",
//         "resourceVersion": "4591"
// }
}

