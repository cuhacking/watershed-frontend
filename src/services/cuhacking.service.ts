import {useAuth} from '../hooks';
import {UserForm} from '../pages/registration';

export const registerUser = async (registrationForm: UserForm) => {
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
    resume,
    country,
    feedback,
    skills,
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
    website: website.value,
    github: github.value,
    linkedin: linkedin.value,
    skills: skills.value,
    country: country.value,
    willingToInterview: feedback.value,
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

  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6IjEzZDc4MTMzLTNlMWYtNDBmNy1hODI3LTUwNmMxMGUyZjY2MCIsImlzc3VlRGF0ZSI6MTYwODY3MzQ2OTUyMCwiZXhwaXJ5RGF0ZSI6MTYwODY3NTI2OTUyMH0.3BcQRvvDpXUZP7rcGRK6HwcJRzn9C9kJZl_QE8btDmJkwlJVde9UMaZ2mXv6hcPvMTbUKF_4Ky-Pq8bA5gBnHA';

  return new Promise((resolve) => {
    fetch(`/api/application`, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${accessToken}`,
      },
      method: 'POST',
      body: payload,
    }).then((res) => {
      resolve(res.json());
    });
  });
};
