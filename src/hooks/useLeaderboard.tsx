import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';

export interface LeaderboardPosition {
  readonly uuid: string;
  readonly name: string;
  readonly discordUsername: string;
  readonly points: number;
  readonly index: number;
}

interface LeaderboardObject {
  leaderboard?: LeaderboardPosition[];
}

const useProvideLeaderboard = (): LeaderboardObject => {
  const {request, user} = useAuth();
  const [leaderboard, setLeaderboard] = useState<
    LeaderboardPosition[] | undefined
  >();

  useEffect(() => {
    if (user != null) {
      request('/api/user/leaderboard')
        .then((value) => value.json())
        .then((positions) => setLeaderboard(positions as LeaderboardPosition[]))
        .catch((e) => console.error(e));
    }
  }, [user]);

  return {leaderboard};
};

const LeaderboardContext = createContext<LeaderboardObject>({});

export const ProvideLeaderboard = (props: {children: React.ReactNode}) => {
  const events = useProvideLeaderboard();

  return (
    <LeaderboardContext.Provider value={events}>
      {props.children}
    </LeaderboardContext.Provider>
  );
};

export const useLeaderboard = () => useContext(LeaderboardContext);
