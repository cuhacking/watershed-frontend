import React, { useReducer, useState } from "react";
import styled, { css } from "styled-components";
import { Desktop, Mobile } from "../shared/util";
import darkDrop from "../assets/img/drop-dark.svg";
import lightDrop from "../assets/img/drop-light.svg";
import Input from "../components/Input";
import Dropdown from "../components/dropdown";
import { globalTheme, themeElement } from "../shared/theme";
import darkArrow from "../assets/img/arrow-down-dark.svg";
import lightArrow from "../assets/img/arrow-down-light.svg";
import TextArea from "../components/TextArea";
import SelectDropdown from "../components/SelectDropdown";
import Dropzone from "../components/Dropzone";
import AppButton from "../components/AppButton";

const RegistrationContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 4rem;
  max-width: 100%;
  min-width: 800px;
  border-radius: 16px;
  align-items: center;
  background-color: var(${themeElement('--spaceGrey', '--white')});
  margin:auto;
  transition: box-shadow 300ms ease;
  box-shadow: var(--hover);

  h3 {
    color: var(${themeElement('--snow', '--spaceGrey')})
  }

  @media (max-width: 768px) {
    min-width: 0;
    width: 100%;
    padding: 1rem 2rem;
  }
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
  justify-content: flex-start;
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
  width: 4rem;
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
  background-color: var(${themeElement('--spaceGrey', '--snow')});

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
  error: null | "string";
}

interface FileValue {
  value: File | null;
  error: null | "string";
}

interface UserForm {
  firstName: FormValue;
  lastName: FormValue;
  studyLevel: FormValue;
  email: FormValue;
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

const emptyFormValue: FormValue = {
  value: "",
  error: null,
};

const emptyFileValue: FileValue = {
  value: null,
  error: null,
};

const emptyForm: UserForm = {
  firstName: emptyFormValue,
  lastName: emptyFormValue,
  studyLevel: emptyFormValue,
  email: emptyFormValue,
  pronouns: emptyFormValue,
  school: emptyFormValue,
  program: emptyFormValue,
  hackathonNumber: emptyFormValue,
  eventsNumber: emptyFormValue,
  skills: emptyFormValue,
  resume: emptyFileValue,
  github: emptyFormValue,
  website: emptyFormValue,
  other: emptyFormValue,
  linkedin: emptyFormValue,
  question1: emptyFormValue,
  question2: emptyFormValue,
  question3: emptyFormValue,
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
  [entry[0]]: { value: entry[1] },
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
    setInfo(["resume", file]);
  };

  const personalInformation = (
    <FormContainer>
      <h3>Personal information</h3>
      <Form>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="text"
            name="firstName"
            value={userForm.firstName.value}
            placeHolder="first name"
            displayLabel
            padded
          ></Input>
          <Input
            onChange={handleFormChange}
            type="text"
            name="lastName"
            value={userForm.lastName.value}
            placeHolder="last name"
            displayLabel
            padded
          ></Input>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="text"
            name="pronouns"
            value={userForm.pronouns.value}
            placeHolder="pronouns"
            displayLabel
            padded
          ></Input>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="email"
            name="email"
            value={userForm.email.value}
            placeHolder="email"
            displayLabel
            padded
            expand
          ></Input>
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
            label="level of study"
            name="studyLevel"
            options={["Middle School", "HS", "UG", "MS", "PHD", "College"]}
            enableOther
            value={userForm.studyLevel.value}
            onClick={handleDropdownChange}
            padded
          ></Dropdown>
          <SelectDropdown
            label="school"
            name="school"
            options={["Carleton University", "uOttawa"]}
            value={userForm.school.value}
            selectClick={handleDropdownChange}
            onChange={handleFormChange}
            padded
          ></SelectDropdown>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="text"
            name="program"
            value={userForm.program.value}
            placeHolder="program of study"
            displayLabel
            padded
          ></Input>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const experience = (
    <FormContainer>
      <h3>Experience</h3>
      <Form>
        <FormRow>
          <Dropdown
            label="hackathons"
            name="hackathonNumber"
            options={["0", "1 - 5", "6 - 10", "10 - 20", "20+"]}
            value={userForm.hackathonNumber.value}
            onClick={handleDropdownChange}
            padded
          ></Dropdown>
          <Dropdown
            label="events"
            name="eventsNumber"
            options={["0", "1 - 5", "6 - 10", "10 - 20", "20+"]}
            value={userForm.eventsNumber.value}
            onClick={handleDropdownChange}
            padded
          ></Dropdown>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="text"
            name="skills"
            value={userForm.skills.value}
            placeHolder="skills (frontend, backend, design, etc)"
            displayLabel
            padded
            expand
          ></Input>
        </FormRow>
        <FormRow>
          <Dropzone
            value={userForm.resume.value}
            padded
            expanded
            onUpload={handleResumeUpload}
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
            type="text"
            name="github"
            value={userForm.github.value}
            placeHolder="GitHub profile"
            displayLabel
            padded
          ></Input>
          <Input
            onChange={handleFormChange}
            type="text"
            name="linkedin"
            value={userForm.linkedin.value}
            placeHolder="LinkedIn profile"
            displayLabel
            padded
          ></Input>
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type="text"
            name="website"
            value={userForm.website.value}
            placeHolder="Personal website"
            displayLabel
            padded
          ></Input>
          <Input
            onChange={handleFormChange}
            type="text"
            name="other"
            value={userForm.other.value}
            placeHolder="Other"
            displayLabel
            padded
          ></Input>
        </FormRow>
      </Form>
    </FormContainer>
  );

  const questions = (
    <FormContainer>
      <h3>Tell us a bit about yourself</h3>
      <Form>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type="text"
            name="question1"
            value={userForm.question1.value}
            placeHolder="What do you to learn at cuHacking 2021: Snowed In?"
            displayLabel
            padded
            style={{ width: "100%" }}
            maxLength={300}
          ></TextArea>
        </FormRow>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type="text"
            name="question2"
            value={userForm.question2.value}
            placeHolder="What are you passionate about? What are you interested in?"
            displayLabel
            padded
            style={{ width: "100%" }}
            maxLength={300}
          ></TextArea>
        </FormRow>
        <FormRow>
          <TextArea
            onChange={handleFormChange}
            type="text"
            name="question3"
            value={userForm.question3.value}
            placeHolder="Describe a big milestone you've recently achieved"
            displayLabel
            padded
            style={{ width: "100%" }}
            maxLength={300}
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
      console.log("verify the form");
      console.log("send request to API");
      return;
    }
    setStep(step + 1);
  };

  const actions = (
    <InteractionsContainer>
      <AppButton
        aria-label={step === steps.personalInformation ? "cancel" : "back"}
        secondary
        onClick={() => previousStep()}
      >
        <Desktop>
          {step === steps.personalInformation ? "cancel" : "back"}
        </Desktop>
        <Mobile>
          <LeftArrow alt="left arrow" src={darkArrow}></LeftArrow>
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
        aria-label={step === steps.questions ? "submit" : "continue"}
        onClick={() => nextStep()}
      >
        <Desktop>{step === steps.questions ? "submit" : "continue"}</Desktop>
        <Mobile>
          <RightArrow
            alt="right arrow"
            src={globalTheme === "dark" ? lightArrow : darkArrow}
          ></RightArrow>
        </Mobile>
      </AppButton>
    </InteractionsContainer>
  );

  return (
    <Container>
      <RegistrationContainer>
        <DropIcon
          src={globalTheme === "dark" ? darkDrop : lightDrop}
          alt="cuhacking icon"
        />
        {currentStep()}
        {actions}
      </RegistrationContainer>
    </Container>
  );
}

export default Registration;
