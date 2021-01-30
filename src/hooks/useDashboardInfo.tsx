import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';
import {EventType, Event} from './useEvents';

export enum Role {
  Hacker,
  Sponsor,
  Organizer,
}

export interface Announcement {
  title: string;
  description: string;
  url?: string;
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

export interface MyInvite {
  uuid: string;
  teamId: string;
  teamName: string;
}

export interface Invite {
  uuid: string;
  firstName: string;
  discordUsername: string;
}

export interface Team {
  uuid: string;
  name: string;
  members: Array<User>;
  submission: boolean;
  invites: Array<Invite>;
}

export interface DashboardObject {
  startTime: string;
  endTime: string;
  user: {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
    role: Role;
    discordId: string | null;
    githubId: string | null;
    discordUsername: string | null;
    confirmed: boolean;
    checkedIn: boolean;
    points: number;
    team: Team | null;
    invites: Array<MyInvite>;
  };
  upcomingEvents: Array<UpcomingEvent>;
  announcements: Array<Announcement>;
}

type CreateTeamFunction = (teamName: string) => Promise<boolean>;
type JoinTeamFunction = (inviteId: string) => Promise<boolean>;
type LeaveTeamFunction = () => Promise<boolean>;
type SendInviteFunction = (username: string) => Promise<boolean>;
type RevokeInviteFunction = (uuid: string) => Promise<boolean>;
type RedeemPointsFunction = (
  code: string
) => Promise<{
  status: 'success' | 'error' | 'invalid' | 'redeemed';
  value?: number;
}>;

export interface DashboardInfo {
  isLoading: boolean;
  dashboard: DashboardObject | null;
  refresh: () => Promise<void>;
  createTeam: CreateTeamFunction;
  joinTeam: JoinTeamFunction;
  leaveTeam: LeaveTeamFunction;
  sendInvite: SendInviteFunction;
  revokeInvite: RevokeInviteFunction;
  redeemPoints: RedeemPointsFunction;
}

const useProvideDashboardInfo = (): DashboardInfo => {
  const {request, user} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [dashboard, setDashboard] = useState<DashboardObject | null>(null);

  const fetchDataNoLoad = async () => {
    try {
      const [
        dashboardResponse,
        eventsResponse,
        announcementsResponse,
      ] = await Promise.all([
        request('/api/dashboard'),
        request('/api/event/upcoming?num=3'),
        request('/api/announcement'),
      ]);

      const dashboardResult = await dashboardResponse.json();
      const eventsResult = await eventsResponse.json();
      const announcementsResult = await announcementsResponse.json();

      console.log(dashboardResult);
      console.log(announcementsResult);

      let memberInvites: Array<Invite> = [];
      let myInvites: Array<MyInvite> = [];

      if (dashboardResult.user.team != null) {
        const response = await request(
          `/api/team/invites/${dashboardResult.user.team.uuid}`
        );

        if (response.status == 200) {
          const invites = await response.json();
          memberInvites = invites.map(
            (invite: any) =>
              ({
                uuid: invite.uuid,
                firstName: invite.firstName,
                discordUsername: invite.discordUsername,
              } as Invite)
          );
        }
      } else {
        const response = await request(`/api/team/invites`);

        if (response.status == 200) {
          const invites = await response.json();
          console.log(invites);
          myInvites = invites.map(
            (invite: any) =>
              ({
                uuid: invite.uuid,
                teamId: invite.teamId,
                teamName: invite.teamName,
              } as MyInvite)
          );
        }
      }

      setDashboard({
        user: {
          uuid: dashboardResult.user.uuid,
          email: dashboardResult.user.email,
          firstName: dashboardResult.firstName || '<noFirstName>',
          lastName: dashboardResult.lastName || '<noFirstName>',
          role: dashboardResult.user.role,
          discordId: dashboardResult.user.discordId,
          githubId: dashboardResult.user.githubId,
          discordUsername: dashboardResult.user.discordUsername,
          confirmed: dashboardResult.user.confirmed,
          checkedIn: dashboardResult.user.checkedIn ?? false,
          invites: myInvites,
          points: dashboardResult.user.points,
          team:
            dashboardResult.user.team != null
              ? {
                  uuid: dashboardResult.user.team.uuid,
                  name: dashboardResult.user.team.name,
                  members: dashboardResult.teamMembers
                    .filter(
                      (member: any) => member.uuid !== dashboardResult.user.uuid
                    )
                    .map(
                      (member: any) =>
                        ({
                          uuid: member.uuid,
                          name: member.firstName,
                          discordUsername: member.discordUsername.split('#')[0],
                        } as User)
                    ),
                  submission: Boolean(dashboardResult.user.team.submission),
                  invites: memberInvites,
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
        announcements: announcementsResult
          .reverse()
          .slice(0, 3)
          .map(
            (announcement: any) =>
              ({
                title: announcement.title,
                description: announcement.description,
                url: announcement.url || undefined,
              } as Announcement)
          ),
      });
    } catch (e) {
      console.error(e);
    }
  };

  const fetchData = async () => {
    setLoading(true);

    await fetchDataNoLoad();

    setLoading(false);
  };

  const refresh = () => {
    return fetchDataNoLoad();
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
        await fetchDataNoLoad();
        return true;
      }

      throw new Error(`Could not create team. Response: ${response.status}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const joinTeam: JoinTeamFunction = async (inviteId) => {
    try {
      const response = await request('/api/team/join', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inviteId,
        }),
      });

      if (response.status === 200) {
        await fetchDataNoLoad();
        return true;
      }

      throw new Error(`Could not join team. Response: ${response.status}`);
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const leaveTeam: LeaveTeamFunction = async () => {
    try {
      console.log('before');
      const response = await request('/api/team/leave');
      console.log('after');

      if (response.status === 200) {
        await fetchDataNoLoad();
        return true;
      }

      throw new Error(`Could not leave team. Response: ${response.status}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const sendInvite: SendInviteFunction = async (username: string) => {
    try {
      const response = await request('/api/team/createInvite', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
        }),
      });

      if (response.status === 200) {
        await fetchDataNoLoad();
        return true;
      }
      throw new Error(`Could not send invite. Response: ${response.status}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const revokeInvite: RevokeInviteFunction = async (uuid) => {
    try {
      const response = await request(`/api/team/invites/${uuid}`, {
        method: 'DELETE',
      });

      if (response.status === 204) {
        await fetchDataNoLoad();
        return true;
      }
      throw new Error(`Could not revoke invite. Response: ${response.status}`);
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  const redeemPoints: RedeemPointsFunction = async (code) => {
    try {
      const response = await request('/api/points/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code,
        }),
      });

      switch (response.status) {
        case 200:
          const {value} = await response.json();
          await fetchDataNoLoad();
          return {status: 'success', value};
        case 404:
          return {status: 'invalid'};
        case 400:
          return {status: 'redeemed'};
        default:
          throw new Error(
            `Could not redeem code. Response: ${response.status}`
          );
      }
    } catch (error) {
      console.log(error);
      return {status: 'error'};
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
    joinTeam,
    leaveTeam,
    sendInvite,
    revokeInvite,
    redeemPoints,
  };
};

const DashboardInfoContext = createContext<DashboardInfo>({
  isLoading: true,
  dashboard: null,
  refresh: async () => {},
  createTeam: async () => false,
  joinTeam: async () => false,
  leaveTeam: async () => false,
  sendInvite: async () => false,
  revokeInvite: async () => false,
  redeemPoints: async () => ({status: 'invalid'}),
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
