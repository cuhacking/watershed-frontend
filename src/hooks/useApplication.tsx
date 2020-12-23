import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';
interface ApplicationObject {
  completed: boolean;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  studyLevel: string;
  pronouns: string;
  school: string;
  program: string;
  hackathonNumber: number;
  eventsNumber: number;
  resumeName: string;
  github: string;
  linkedin: string;
  website: string;
  question1: string;
  question2: string;
  question3: string;
  willingToInterview: boolean;
  other: null;
}

type ApplicationContextObject = {
  isLoading: boolean;
  application: ApplicationObject | null;
  sendApplication: (
    form: Omit<ApplicationObject, 'resumeName' | 'other'>,
    resume: File | null
  ) => Promise<'ok' | 'invalid-form' | 'error'>;
};

const useProvideApplication = (): ApplicationContextObject => {
  const {request, user} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationObject | null>(
    null
  );

  const getApplication = async () => {
    setLoading(true);
    try {
      const response = await request('/api/application/my');

      switch (response.status) {
        case 200:
          const _application = await response.json();
          setApplication(_application);
          break;
        case 404:
          setApplication(null);
          break;
        case 401:
        default:
          throw response;
      }
    } catch (error) {
      console.error('Unexpected error retrieving application: ', error);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (user !== null) {
      getApplication();
    }
    setLoading(false);
  }, [user]);

  const sendApplication = async (
    form: Omit<ApplicationObject, 'resumeName' | 'other'>,
    resume: File | null
  ): Promise<'ok' | 'invalid-form' | 'error'> => {
    const payload = new FormData();
    payload.append('body', JSON.stringify({...form}));

    if (resume) {
      payload.append('resume', resume, resume.name);
    }

    try {
      const response = await request(`/api/application`, {
        method: 'POST',
        body: payload,
      });

      switch (response.status) {
        case 201:
          getApplication();
          return 'ok';
        case 400:
          return 'invalid-form';
        case 401:
        default:
          throw response;
      }
    } catch (error) {
      console.error('Unexpected error when submitting application: ', error);
      return 'error';
    }
  };

  return {
    isLoading,
    application,
    sendApplication,
  };
};

const ApplicationContext = createContext<Partial<ApplicationContextObject>>({});

export const ProvideApplication = (props: {children: React.ReactNode}) => {
  const applicationContext = useProvideApplication();

  return (
    <ApplicationContext.Provider value={applicationContext}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () =>
  useContext(ApplicationContext) as ApplicationContextObject;
