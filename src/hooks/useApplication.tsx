import React, {useState, useEffect, useContext, createContext} from 'react';
import {useAuth} from './useAuth';

interface FormValue {
  value: string;
  error: null | 'string';
  required: boolean;
}

interface BooleanValue {
  value: boolean;
  error: null | 'string';
  required: boolean;
}

interface FileValue {
  value: File | null;
  error: null | 'string';
  required: boolean;
}

export interface ApplicationForm {
  firstName: FormValue;
  lastName: FormValue;
  email: FormValue;
  country: FormValue;
  studyLevel: FormValue;
  pronouns: FormValue;
  school: FormValue;
  program: FormValue;
  hackathonNumber: FormValue;
  eventsNumber: FormValue;
  skills: FormValue;
  resume: FileValue;
  github: FormValue;
  linkedin: FormValue;
  website: FormValue;
  other: FormValue;
  question1: FormValue;
  question2: FormValue;
  question3: FormValue;
  feedback: BooleanValue;
}

export interface ApplicationObject {
  completed: boolean;
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  studyLevel: string;
  pronouns: string;
  school: string;
  program: string;
  hackathonNumber: string;
  eventsNumber: string;
  skills: string;
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

const filterInto = ({
  firstName,
  lastName,
  pronouns,
  email,
  studyLevel,
  program,
  question1,
  question2,
  question3,
  hackathonNumber,
  website,
  github,
  linkedin,
  country,
  feedback,
  skills,
  school,
  eventsNumber,
}: ApplicationForm): Omit<ApplicationObject, 'resumeName' | 'other'> => ({
  completed: true,
  firstName: firstName.value,
  lastName: lastName.value,
  pronouns: pronouns.value,
  email: email.value,
  studyLevel: studyLevel.value,
  program: program.value,
  question1: question1.value,
  question2: question2.value,
  question3: question3.value,
  hackathonNumber: hackathonNumber.value,
  website: website.value,
  github: github.value,
  linkedin: linkedin.value,
  skills: skills.value,
  country: country.value,
  willingToInterview: feedback.value,
  school: school.value,
  eventsNumber: eventsNumber.value,
});

type ApplicationContextObject = {
  isLoading: boolean;
  application: ApplicationObject | null;
  sendApplication: (
    form: ApplicationForm
  ) => Promise<'ok' | 'invalid-form' | 'error'>;
};

const useProvideApplication = (): ApplicationContextObject => {
  const {request, user} = useAuth();
  const [isLoading, setLoading] = useState(true);
  const [application, setApplication] = useState<ApplicationObject | null>(
    null
  );

  useEffect(() => {
    setLoading(true);

    const getApplication = async () => {
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

    if (user !== null) {
      getApplication();
    }
  }, [user]);

  const sendApplication = async (
    form: ApplicationForm
  ): Promise<'ok' | 'invalid-form' | 'error'> => {
    const registrationRequestBody = filterInto(form);

    const payload = new FormData();
    payload.append('body', JSON.stringify(registrationRequestBody));

    if (form.resume.value) {
      payload.append('resume', form.resume.value, form.resume.value?.name);
    }

    try {
      const response = await request(`/api/application`, {
        method: 'POST',
        body: payload,
      });

      switch (response.status) {
        case 201:
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
  const auth = useProvideApplication();

  return (
    <ApplicationContext.Provider value={auth}>
      {props.children}
    </ApplicationContext.Provider>
  );
};

export const useApplication = () =>
  useContext(ApplicationContext) as ApplicationContextObject;
