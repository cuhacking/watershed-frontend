import React, {useState, useEffect, useContext, createContext} from 'react';

export type EventType =
  | 'sponsor'
  | 'key-times'
  | 'workshops'
  | 'activities'
  | 'social-events';

export interface Event {
  id: number;
  title: string;
  type: EventType;
  startTime: Date;
  endTime?: Date;
  location?: string;
  locationName?: string;
  host?: string;
  description: string;
  resources: Resource[];
}

export interface Resource {
  id: number;
  title: string;
  link: string;
}

interface EventsObject {
  events?: Event[];
}

const useProvideEvents = (): EventsObject => {
  const [events, setEvents] = useState<Event[] | undefined>();

  useEffect(() => {
    fetch('/api/event')
      .then((value) => value.json())
      .then((events) =>
        events.map((event: any) => ({
          ...event,
          startTime: new Date(event.startTime),
          endTime: event.endTime ? new Date(event.endTime) : undefined,
        }))
      )
      .then((events) => setEvents(events as Event[]))
      .catch((e) => console.error(e));
  }, []);

  return {events};
};

const EventsContext = createContext<EventsObject>({});

export const ProvideEvents = (props: {children: React.ReactNode}) => {
  const events = useProvideEvents();

  return (
    <EventsContext.Provider value={events}>
      {props.children}
    </EventsContext.Provider>
  );
};

export const useEvents = () => useContext(EventsContext);
