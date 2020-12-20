import React, {useReducer, useState} from 'react';
import styled, {css} from 'styled-components';
import {Desktop, Mobile} from '../shared/util';
import darkDrop from '../assets/img/drop-dark.svg';
import lightDrop from '../assets/img/drop-light.svg';
import Input from '../components/Input';
import Dropdown from '../components/dropdown';
import {globalTheme, themeElement} from '../shared/theme';
import darkArrow from '../assets/img/arrow-down-dark.svg';
import lightArrow from '../assets/img/arrow-down-light.svg';
import TextArea from '../components/TextArea';
import SelectDropdown from '../components/SelectDropdown';
import Dropzone from '../components/Dropzone';
import AppButton from '../components/AppButton';

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  max-width: 100%;
  min-width: 800px;
  border-radius: 16px;
  align-items: center;
  background-color: var(${themeElement('--spaceGrey', '--white')});
  margin: auto;
  transition: box-shadow 300ms ease;
  box-shadow: var(--hover);

  h3,
  p {
    color: var(${themeElement('--snow', '--spaceGrey')});
  }

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
    padding: 1rem 2rem;
  }
`;

const ExperienceLabel = styled.label`
  color: var(${themeElement('--snow', '--spaceGrey')});
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0rem;
  width: 80%;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.25rem 0;

  @media (max-width: 768px) {
    & div {
      width: 100% !important;
    }
  }
`;

const InteractionsContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const DropIcon = styled.img`
  width: 2.5rem;
`;

const MarkersContainer = styled.div`
  position: absolute;
  left: calc(50% - 52px);
  right: 50%;
  width: min-content;
  justify-self: center;
  display: flex;
`;

const markerStyle = css`
  height: 0.5rem;
  width: 0.5rem;
  border-radius: 100%;
  box-shadow: var(--hover);

  &:not(:first-child) {
    margin-left: 1rem;
  }
`;

const StepMarker = styled.div`
  ${markerStyle};
  background-color: var(${themeElement('--spaceDark', '--snow')});
`;

const StepMarkerDone = styled.div`
  ${markerStyle};
  background-color: var(${themeElement('--snow', '--ikeaBlue')});
`;

const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  background-color: var(${themeElement('--spaceDark', '--snow')});

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const LeftArrow = styled.img`
  transform: rotate(90deg);
`;

const RightArrow = styled.img`
  transform: rotate(-90deg);
`;

interface FormValue {
  value: string;
  error: null | 'string';
  required: boolean;
}

interface FileValue {
  value: File | null;
  error: null | 'string';
  required: boolean;
}

interface UserForm {
  firstName: FormValue;
  lastName: FormValue;
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
}

const formValue: FormValue = {
  value: '',
  error: null,
  required: false
};

const formValueRequired: FormValue = {
  value: '',
  error: null,
  required: true
};

const fileValueRequired: FileValue = {
  value: null,
  error: null,
  required: true
};

const emptyForm: UserForm = {
  firstName: formValueRequired,
  lastName: formValueRequired,
  pronouns: formValue,
  studyLevel: formValueRequired,
  school: formValueRequired,
  program: formValue,
  hackathonNumber: formValueRequired,
  eventsNumber: formValueRequired,
  skills: formValueRequired,
  resume: fileValueRequired,
  github: formValue,
  linkedin: formValue,
  website: formValue,
  other: formValue,
  question1: formValueRequired,
  question2: formValueRequired,
  question3: formValueRequired,
};

enum steps {
  personalInformation,
  education,
  experience,
  additional,
  questions,
}

const formReducer = (state: UserForm, entry: string[]) => ({
  ...state,
  [entry[0]]: {
    ...state[entry[0] as keyof UserForm],
    value: entry[1]
  },
});

function Registration() {
  const [step, setStep] = useState(0);
  const [userForm, setInfo] = useReducer(formReducer, emptyForm);
  const SECTIONS = 5;
  const finalStep = steps.questions;

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo([name, value]);
  };

  const handleDropdownChange = (name: string, value: string) => {
    setInfo([name, value]);
  };

  const handleResumeUpload = (file: string) => {
    setInfo(['resume', file]);
  };

  const personalInformation = (
    <FormContainer>
      <h3>Personal information</h3>
      <Form>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='firstName'
            value={userForm.firstName.value}
            placeHolder='First name'
            displayLabel
            padded
            required={userForm.firstName.required}
          ></Input>
          <Input
            onChange={handleFormChange}
            type='text'
            name='lastName'
            value={userForm.lastName.value}
            placeHolder='Last name'
            displayLabel
            padded
            required={userForm.lastName.required}
          ></Input>
        </FormRow>
        <FormRow>
          <Dropdown
            label='Pronouns'
            name='pronouns'
            options={['He/Him', 'She/Her', 'They/Them']}
            enableOther
            value={userForm.pronouns.value}
            onClick={handleDropdownChange}
            padded
            required={userForm.pronouns.required}
          ></Dropdown>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const education = (
    <FormContainer>
      <h3>Education</h3>
      <Form>
        <FormRow>
          <Dropdown
            label='Level of study'
            name='studyLevel'
            options={['Middle School', 'High School', 'Bachelors', 'Masters', 'PhD', 'College']}
            enableOther
            value={userForm.studyLevel.value}
            onClick={handleDropdownChange}
            padded
            required={userForm.studyLevel.required}
          ></Dropdown>
        </FormRow>
        <FormRow>
          <SelectDropdown
            label='School'
            name='school'
            options={['Carleton University', 'uOttawa']}
            value={userForm.school.value}
            selectClick={handleDropdownChange}
            onChange={handleFormChange}
            padded
            required={userForm.school.required}
          ></SelectDropdown>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='program'
            value={userForm.program.value}
            placeHolder='Program of study'
            displayLabel
            padded
            required={userForm.program.required}
          ></Input>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const experience = (
    <FormContainer>
      <h3>Experience</h3>
      <Form>
        <FormRow style={{justifyContent: 'center'}}>
          <ExperienceLabel>I've been to</ExperienceLabel>
          <Dropdown
            name='hackathonNumber'
            options={['0', '1 - 5', '6 - 10', '10 - 20', '20+']}
            value={userForm.hackathonNumber.value}
            onClick={handleDropdownChange}
            padded
            small
            required={userForm.hackathonNumber.required}
          ></Dropdown>
          <ExperienceLabel>hackathons</ExperienceLabel>
        </FormRow>
        <FormRow style={{justifyContent: 'center'}}>
          <ExperienceLabel>and</ExperienceLabel>
          <Dropdown
            name='eventsNumber'
            options={['0', '1 - 5', '6 - 10', '10 - 20', '20+']}
            value={userForm.eventsNumber.value}
            onClick={handleDropdownChange}
            padded
            small
            required={userForm.eventsNumber.required}
          ></Dropdown>
          <ExperienceLabel>other events in tech</ExperienceLabel>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='skills'
            value={userForm.skills.value}
            placeHolder='List your skills (i.e. frontend)'
            displayLabel
            padded
            expand
            required={userForm.skills.required}
          ></Input>
        </FormRow>
        <FormRow>
          <Dropzone
            value={userForm.resume.value}
            padded
            expanded
            onUpload={handleResumeUpload}
            required={userForm.resume.required}
          ></Dropzone>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const additional = (
    <FormContainer>
      <h3>Additional information</h3>
      <Form>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='github'
            value={userForm.github.value}
            placeHolder='GitHub'
            displayLabel
            padded
            required={userForm.github.required}
          ></Input>
          <Input
            onChange={handleFormChange}
            type='text'
            name='linkedin'
            value={userForm.linkedin.value}
            placeHolder='LinkedIn'
            displayLabel
            padded
            required={userForm.linkedin.required}
          ></Input>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='website'
            value={userForm.website.value}
            placeHolder='Personal website'
            displayLabel
            padded
            required={userForm.website.required}
          ></Input>
          <Input
            onChange={handleFormChange}
            type='text'
            name='other'
            value={userForm.other.value}
            placeHolder='Other'
            displayLabel
            padded
            required={userForm.other.required}
          ></Input>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const questions = (
    <FormContainer>
      <h3>Tell us a little more yourself</h3>
      <Form>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type='text'
            name='question1'
            value={userForm.question1.value}
            placeHolder='What do you want to learn at cuHacking 2021: Snowed In?'
            displayLabel
            padded
            style={{width: '100%'}}
            maxLength={300}
            required={userForm.question1.required}
          ></TextArea>
        </FormRow>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type='text'
            name='question2'
            value={userForm.question2.value}
            placeHolder='What are you passionate about? What are you interested in?'
            displayLabel
            padded
            style={{width: '100%'}}
            maxLength={300}
            required={userForm.question2.required}
          ></TextArea>
        </FormRow>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type='text'
            name='question3'
            value={userForm.question3.value}
            placeHolder="Describe a big milestone you've recently achieved"
            displayLabel
            padded
            style={{width: '100%'}}
            maxLength={300}
            required={userForm.question3.required}
          ></TextArea>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const currentStep = () => {
    switch (step) {
      case steps.personalInformation:
        return personalInformation;
      case steps.education:
        return education;
      case steps.experience:
        return experience;
      case steps.additional:
        return additional;
      case steps.questions:
        return questions;
    }
  };

  const previousStep = () => {
    if (step === steps.personalInformation) return;
    setStep(step - 1);
  };

  const nextStep = () => {
    if (step === finalStep) {
      console.log('verify the form');
      console.log('send request to API');
      return;
    }
    setStep(step + 1);
  };

  const actions = (
    <InteractionsContainer>
      <AppButton
        aria-label={step === steps.personalInformation ? 'Cancel' : 'Back'}
        secondary
        onClick={() => previousStep()}
      >
        <Desktop>
          {step === steps.personalInformation ? 'Cancel' : 'Back'}
        </Desktop>
        <Mobile>
          <LeftArrow alt='left arrow' src={darkArrow}></LeftArrow>
        </Mobile>
      </AppButton>
      <MarkersContainer>
        {[...Array(SECTIONS)].map((_, index) =>
          step < index ? (
            <StepMarker key={index}></StepMarker>
          ) : (
            <StepMarkerDone key={index}></StepMarkerDone>
          )
        )}
      </MarkersContainer>
      <AppButton
        aria-label={step === steps.questions ? 'Submit' : 'Continue'}
        onClick={() => nextStep()}
      >
        <Desktop>{step === steps.questions ? 'Submit' : 'Continue'}</Desktop>
        <Mobile>
          <RightArrow
            alt='right arrow'
            src={globalTheme === 'dark' ? lightArrow : darkArrow}
          ></RightArrow>
        </Mobile>
      </AppButton>
    </InteractionsContainer>
  );

  return (
    <Container>
      <RegistrationContainer>
        <DropIcon
          src={globalTheme === 'dark' ? darkDrop : lightDrop}
          alt='cuhacking icon'
        />
        {currentStep()}
        {actions}
      </RegistrationContainer>
    </Container>
  );
}

export default Registration;
