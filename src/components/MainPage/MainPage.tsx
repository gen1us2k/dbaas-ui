import React, {FC, useState} from 'react';
import {Tab, TabContent, TabsBar, useTheme2} from "@grafana/ui";
import K8sRegistration from "../Kubernetes/K8sRegistration/K8sRegistration";
import DBClusterList from "../DBCluster/DBClusterList/DBClusterList";

export const MainPage: FC = () => {
    const theme = useTheme2();
    const tabs = [
        { label: 'k8s registration', active: true},
        { label: 'dbclusters', active: false},
    ];

    const [state, setState] = useState(tabs);

    return (
        <div style={{ background: theme.colors.background.canvas, height: '100vh'}}>
            <TabsBar>
                {state.map((tab, index) =>
                    (<Tab
                            key={index}
                            label={tab.label}
                            active={tab.active}
                            onChangeTab={() => setState(state.map((tab, idx) => ({ ...tab, active: idx === index })))}
                        />))}
            </TabsBar>
            <TabContent>
                {state[0].active && <K8sRegistration />}
                {state[1].active && <DBClusterList/>}
            </TabContent>
        </div>
    );
}

export default MainPage;
