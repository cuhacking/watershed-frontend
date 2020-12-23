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

  const accessToken =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpZCI6ImQ4MzFkM2NhLTE2MGMtNGI4OC05ZmMyLWJlYzk4MzMxZmQ5YiIsImlzc3VlRGF0ZSI6MTYwODY4MTM2NjAxNCwiZXhwaXJ5RGF0ZSI6MTYwODY4MzE2NjAxNH0.5Qep9xVzkfKjEAPoJOXse1697WyZZdrCJWvEQT_Nry2e8UzmuWktpWyKhrpkRZAkS4GJKAweLA90lmXlrjukSA';

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
