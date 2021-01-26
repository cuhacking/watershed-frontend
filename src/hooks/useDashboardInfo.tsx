import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';

export interface DashboardObject {
  startTime: string;
  endTime: string;
}

const useProvideDashboardInfo = (): DashboardObject => {
  const {request, user} = useAuth();
  const [dashboard, setDashboard] = useState<DashboardObject | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await request('/api/dashboard');
        const result = await response.json();

        setDashboard({
          startTime: result.startTime,
          endTime: result.endTime,
        });
      } catch (e) {
        console.error(e);
      }
    };
    if (user !== null) {
      fetchData();
    }
  }, [user]);

  return {
    startTime: dashboard?.startTime ?? '',
    endTime: dashboard?.endTime ?? '',
  };
};

const DashboardInfoContext = createContext<DashboardObject>({
  startTime: '',
  endTime: '',
});

export const ProvideDashboardInfo = (props: {children: React.ReactNode}) => {
  const dashboardInfo = useProvideDashboardInfo();

  return (
    <DashboardInfoContext.Provider value={dashboardInfo}>
      {props.children}
    </DashboardInfoContext.Provider>
  );
};

export const useDashboardInfo = () => useContext(DashboardInfoContext);
