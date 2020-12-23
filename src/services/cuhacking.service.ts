import {UserForm} from '../pages/dashboard/registration';

export const registerUser = async (
  registrationForm: UserForm,
  accessToken: string
) => {
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
  }: UserForm) => ({
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
  const registrationRequestBody = filterInto(registrationForm);

  const payload = new FormData();
  payload.append('body', JSON.stringify(registrationRequestBody));
  if (registrationForm.resume.value) {
    payload.append(
      'resume',
      registrationForm.resume.value,
      registrationForm.resume.value?.name
    );
  }

  return new Promise((resolve) => {
    fetch(`/api/application`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: payload,
    }).then((res) => {
      resolve(res.text());
    });
  });
};
