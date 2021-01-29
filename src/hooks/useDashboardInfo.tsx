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

export interface User {
  uuid: string;
  name: string;
  discordUsername: string;
}

export interface TeamInvite {
  uuid: string;
  teamId: string;
  userId: string;
}
export interface Team {
  uuid: string;
  name: string;
  members: Array<User>;
  submission: boolean;
  invites: Array<TeamInvite>;
}

export interface DashboardObject {
  startTime: string;
  endTime: string;
  user: {
    uuid: string;
    // firstName: string;
    // lastName: string; TODO: RYAN!!!
    email: string;
    role: Role;
    discordId: string | null;
    githubId: string | null;
    discordUsername: string | null;
    confirmed: boolean;
    checkedIn: boolean;
    points: number;
    team: Team | null;
  };
  upcomingEvents: Array<UpcomingEvent>;
}

type CreateTeamFunction = (teamName: string) => Promise<boolean>;
export interface DashboardInfo {
  isLoading: boolean;
  dashboard: DashboardObject | null;
  refresh: Function;
  createTeam: CreateTeamFunction;
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

      console.log(dashboardResult);

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
          team:
            dashboardResult.user.team != null
              ? {
                  uuid: dashboardResult.user.team.uuid,
                  name: dashboardResult.user.team.name,
                  members: dashboardResult.user.team.members.map(
                    (member: any) =>
                      ({
                        uuid: member.uuid,
                        name: '<noName>',
                        discordUsername: member.discordId ?? '<noDiscord>',
                      } as User)
                  ),
                  submission: Boolean(dashboardResult.user.team.submission),
                  invites: dashboardResult.user.team.invites ?? [],
                }
              : null,
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
  };

  const createTeam: CreateTeamFunction = async (teamName) => {
    try {
      const response = await request('/api/team', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: teamName,
        }),
      });

      if (response.status === 201) {
        return true;
      }

      throw new Error(`Could not create team. Response: ${response.status}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  useEffect(() => {
    if (user !== null) {
      fetchData();
    }
  }, [user]);

  return {
    isLoading,
    dashboard,
    refresh,
    createTeam,
  };
};

const DashboardInfoContext = createContext<DashboardInfo>({
  isLoading: true,
  dashboard: null,
  refresh: () => {},
  createTeam: async () => false,
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
