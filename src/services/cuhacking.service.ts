import {UserForm} from '../pages/registration';

const CUHACKING_URL = 'https://dev.cuhacking.com/';

export const registerUser = async (registrationForm: UserForm) => {
  const registrationInfo = ({
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
    resume,
  }: UserForm) => ({
    completed: true,
    firstName: firstName.value,
    lastName: lastName.value,
    pronouns: pronouns.value,
    email: email.value,
    levelOfStudy: studyLevel.value,
    program: program.value,
    shortAnswer1: question1.value,
    shortAnswer2: question2.value,
    shortAnswer3: question3.value,
    numHackathongs: hackathonNumber.value,
    personalSiteUrl: website.value,
    resumeName: resume.value,
  });

  return new Promise((resolve) => {
    fetch(`${CUHACKING_URL}/application`, {
      method: 'POST',
      body: JSON.stringify(registrationInfo),
    }).then((res) => {
      resolve(res.json());
    });
  });
};
