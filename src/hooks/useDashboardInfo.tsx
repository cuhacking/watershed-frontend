import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';
import {EventType, Event} from './useEvents';

export enum Role {
  Hacker,
  Sponsor,
  Organizer,
}

export type UpcomingEvent = Omit<
  Event,
  'location' | 'locationName' | 'host' | 'resources'
>;

export interface DashboardObject {
  startTime: string;
  endTime: string;
  user: {
    uuid: string;
    email: string;
    role: Role;
    discordId: string | null;
    githubId: string | null;
    discordUsername: string | null;
    confirmed: boolean;
    checkedIn: boolean;
    points: number;
  };
  upcomingEvents: Array<UpcomingEvent>;
}

export interface DashboardInfo {
  isLoading: boolean;
  dashboard: DashboardObject | null;
  refresh: Function
}

const useProvideDashboardInfo = (): DashboardInfo => {
  const {request, user} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardObject | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [dashboardResponse, eventsResponse] = await Promise.all([
        request('/api/dashboard'),
        request('/api/event/upcoming?num=3'),
      ]);

      const dashboardResult = await dashboardResponse.json();
      const eventsResult = await eventsResponse.json();

      setDashboard({
        user: {
          uuid: dashboardResult.user.uuid,
          email: dashboardResult.user.email,
          role: dashboardResult.user.role,
          discordId: dashboardResult.user.discordId,
          githubId: dashboardResult.user.githubId,
          discordUsername: dashboardResult.user.discordUsername,
          confirmed: dashboardResult.user.confirmed,
          checkedIn: dashboardResult.user.checkedIn ?? false,
          points: dashboardResult.user.points,
        },
        startTime: dashboardResult.startTime,
        endTime: dashboardResult.endTime,
        upcomingEvents: eventsResult.map(
          (rawEvent: any) =>
            ({
              id: rawEvent.id,
              title: rawEvent.title,
              type: rawEvent.type,
              startTime: rawEvent.startTime,
              endTime: rawEvent.endTime,
              description: rawEvent.description,
            } as UpcomingEvent)
        ),
      });
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const refresh = () => {
    fetchData();
  }

  useEffect(() => {
    if (user !== null) {
      fetchData();
    }
  }, [user]);

  return {
    isLoading,
    dashboard,
    refresh
  };
};

const DashboardInfoContext = createContext<DashboardInfo>({
  isLoading: true,
  dashboard: null,
  refresh: () => {}
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
