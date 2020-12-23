import React, {useEffect, useReducer, useState} from 'react';
import styled, {css} from 'styled-components';
import {Prompt, useHistory} from 'react-router-dom';
import darkArrow from 'assets/img/arrow-down-dark.svg';
import lightArrow from 'assets/img/arrow-down-light.svg';
import {ModalLayout} from '../../layouts';
import {useApplication, useAuth} from '../../hooks';
import Input from '../../components/Input';
import Dropdown from '../../components/dropdown';
import TextArea from '../../components/TextArea';
import SelectDropdown from '../../components/SelectDropdown';
import Dropzone from '../../components/Dropzone';
import AppButton from '../../components/AppButton';
import {globalTheme, themeElement} from '../../shared/theme';
import {Desktop, Mobile, Required} from '../../shared/util';
import schools from '../../schools.json';
import countries from '../../countries.json';

const ExperienceLabel = styled.div`
  color: var(${themeElement('--snow', '--spaceGrey')});
`;

const FormContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0rem;

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
    padding: 0;

    & div {
      width: 100%;
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

const BackButton = styled(AppButton)`
  @media (min-width: 769px) {
    margin-right: 196px;
  }
`;

const ForwardButton = styled(AppButton)`
  @media (min-width: 769px) {
    margin-left: 196px;
  }
`;

const StepMarker = styled.div<{done?: boolean}>`
  ${markerStyle};
  transition: background-color 500ms cubic-bezier(0.33, 1, 0.68, 1);
  background-color: var(${themeElement('--snow', '--ikeaBlue')});
  background-color: ${({done}) =>
    done && `var(${themeElement('--spaceDark', '--snow')})`};
`;

const FeedbackText = styled.div`
  color: var(${themeElement('--snow', '--spaceGrey')});
  max-width: 400px;
  text-align: center;
  flex-grow: 1;
`;

const LeftArrow = styled.img`
  transform: rotate(90deg);
`;

const RightArrow = styled.img`
  transform: rotate(-90deg);
`;

const NumberInput = styled.input`
  max-width: 5ch;
  margin: 0 0.5em;
`;

const BasicLink = styled.a`
  font-weight: bold;

  @media (min-width: 768px) {
    &:hover {
      text-decoration: underline;
    }
  }
`;

const CheckboxStyle = styled.label`
  display: flex;
  margin-bottom: 16px;
  font-size: 0.9em;
  font-style: italic;
  position: relative;

  width: 100%;
  max-width: 425px;

  input {
    margin-right: 1em;
  }

  div {
    text-align: left;
  }
`;

const Checkbox = ({
  children,
  ...rest
}: React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>) => {
  return (
    <CheckboxStyle>
      <Required style={{opacity: rest.checked ? 0 : 1, top: 0, right: 0}} />
      <input type='checkbox' {...rest} />
      <div>{children}</div>
    </CheckboxStyle>
  );
};

const RequiredNotice = styled.p`
  margin: 0;
  font-style: italic;
  font-size: 0.8em;

  span {
    color: var(--wineDark);
  }
`;

const RequiredMessage = styled.p`
  font-weight: bold;
  span {
    color: var(--wineDark);
  }
`;

interface StringValue {
  value: string;
  error: null | 'string';
  required: boolean;
}

interface NumberValue {
  value: number;
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

export interface UserForm {
  firstName: StringValue;
  lastName: StringValue;
  email: StringValue;
  country: StringValue;
  studyLevel: StringValue;
  pronouns: StringValue;
  school: StringValue;
  program: StringValue;
  hackathonNumber: NumberValue;
  eventsNumber: NumberValue;
  resume: FileValue;
  github: StringValue;
  linkedin: StringValue;
  website: StringValue;
  other: StringValue;
  question1: StringValue;
  question2: StringValue;
  question3: StringValue;
  willingToInterview: BooleanValue;
  MLHCode: BooleanValue;
  MLHPrivacy: BooleanValue;
}

const stringValue: StringValue = {
  value: '',
  error: null,
  required: false,
};

const stringValueRequired: StringValue = {
  value: '',
  error: null,
  required: true,
};

const numberValueRequired: NumberValue = {
  value: 0,
  error: null,
  required: true,
};

const fileValueRequired: FileValue = {
  value: null,
  error: null,
  required: true,
};

const booleanValue: BooleanValue = {
  value: false,
  error: null,
  required: false,
};

const booleanValueRequired: BooleanValue = {
  value: false,
  error: null,
  required: true,
};

const emptyForm: UserForm = {
  firstName: stringValueRequired,
  lastName: stringValueRequired,
  email: stringValueRequired,
  country: stringValueRequired,
  pronouns: stringValue,
  studyLevel: stringValueRequired,
  school: stringValueRequired,
  program: stringValue,
  hackathonNumber: numberValueRequired,
  eventsNumber: numberValueRequired,
  resume: fileValueRequired,
  github: stringValue,
  linkedin: stringValue,
  website: stringValue,
  other: stringValue,
  question1: stringValueRequired,
  question2: stringValueRequired,
  question3: stringValueRequired,
  willingToInterview: booleanValue,
  MLHCode: booleanValueRequired,
  MLHPrivacy: booleanValueRequired,
};

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
  willingToInterview,
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
  hackathonNumber: hackathonNumber.value as number,
  website: website.value,
  github: github.value,
  linkedin: linkedin.value,
  country: country.value,
  willingToInterview: willingToInterview.value,
  school: school.value,
  eventsNumber: eventsNumber.value as number,
});

enum steps {
  personalInformation,
  education,
  experience,
  questions,
  additional,
}

const formReducer = (state: UserForm, entry: any[]) => ({
  ...state,
  [entry[0]]: {
    ...state[entry[0] as keyof UserForm],
    value: entry[1],
  },
});

function Registration() {
  const history = useHistory();
  const auth = useAuth();
  const {sendApplication} = useApplication();
  const [step, setStep] = useState(0);
  const [formIsOk, setFormOk] = useState(false);
  const [userForm, setInfo] = useReducer(formReducer, emptyForm);
  const SECTIONS = 5;
  const finalStep = steps.additional;

  useEffect(() => {
    setInfo(['email', auth.user?.email ?? '']);
  }, []);

  useEffect(() => {
    formIsVerified();
  }, [userForm]);

  const formIsVerified = (): boolean => {
    let complete = true;

    Object.values(userForm).forEach((entry) => {
      if (entry.required) {
        if (typeof entry.value === 'string' && entry.value === '') {
          complete = false;
        }

        if (typeof entry.value === 'boolean' && entry.value === false) {
          complete = false;
        }

        if (entry.value === null) {
          complete = false;
        }
      }
    });

    setFormOk(complete);
    return complete;
  };

  const submitForm = async (form: UserForm) => {
    const formattedForm = filterInto(form);

    const result = await sendApplication(formattedForm, form.resume?.value);

    switch (result) {
      case 'ok':
        history.push('/dashboard');
        break;
      case 'invalid-form':
        // This only happens if the frontend and backend are out of sync
        alert('Please fill out all required fields.');
        break;
      case 'error':
        alert('Something went wrong. Please the organizers knows via Discord.');
        break;
    }
  };

  const handleFormChange = (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setInfo([name, value]);
  };

  const handleDropdownChange = (name: string, value: string | boolean) => {
    setInfo([name, value]);
  };

  const handleResumeUpload = (file: string) => {
    setInfo(['resume', file]);
  };

  const personalInformation = (
    <FormContainer>
      <h3>Personal information</h3>
      <RequiredNotice>
        Required fields are marked with a <span>•</span> symbol.
      </RequiredNotice>
      <Form>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='email'
            name='email'
            value={userForm.email.value}
            placeHolder='Email' // TODO: Display user's default email
            displayLabel
            padded
            required={userForm.email.required}
            expand
          />
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='firstName'
            value={userForm.firstName.value}
            placeHolder='First name'
            displayLabel
            padded
            grow
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
            grow
            required={userForm.lastName.required}
          ></Input>
        </FormRow>
        <FormRow>
          <Dropdown
            label='Pronouns (optional*)'
            name='pronouns'
            options={[
              {value: 'He/Him', label: 'He/Him'},
              {value: 'She/Her', label: 'She/Her'},
              {value: 'They/Them', label: 'They/Them'},
            ]}
            enableOther
            value={userForm.pronouns.value}
            onClick={handleDropdownChange}
            padded
            required={userForm.pronouns.required}
            grow
          />
          <SelectDropdown
            label='Country of Residence'
            name='country'
            options={countries as string[]}
            value={userForm.country.value}
            selectClick={handleDropdownChange}
            onChange={handleFormChange}
            padded
            required={userForm.country.required}
            grow
          />
        </FormRow>
        <ExperienceLabel>
          *If selected, this will available to other hackers during the event.
        </ExperienceLabel>
      </Form>
    </FormContainer>
  );

  const education = (
    <FormContainer>
      <h3>Education</h3>
      <Form>
        <FormRow>
          <Dropdown
            label='Current Level of Study'
            name='studyLevel'
            options={[
              {value: 'Middle School', label: 'Middle School'},
              {value: 'High School', label: 'High School'},
              {value: "Bachelor's", label: "Bachelor's"},
              {value: "Master's", label: "Master's"},
              {value: 'PhD', label: 'PhD'},
              {value: 'College', label: 'College'},
            ]}
            enableOther
            value={userForm.studyLevel.value}
            onClick={handleDropdownChange}
            padded
            required={userForm.studyLevel.required}
          />
        </FormRow>
        <FormRow>
          <SelectDropdown
            label='School'
            name='school'
            options={schools as string[]}
            value={userForm.school.value}
            selectClick={handleDropdownChange}
            onChange={handleFormChange}
            padded
            required={userForm.school.required}
            expand
          />
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='program'
            value={userForm.program.value}
            placeHolder='Program (if applicable)'
            displayLabel
            padded
            required={userForm.program.required}
            expand
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
          <NumberInput
            name='hackathonNumber'
            type='number'
            value={userForm.hackathonNumber.value}
            min={0}
            max={99}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfo([event.target.name, parseInt(event.target.value)]);
            }}
            required={userForm.hackathonNumber.required}
          />
          {/* <Dropdown
            name='hackathonNumber'
            options={[
              {label: '0', value: '0'},
              {label: '1 - 5', value: '1 - 5'},
              {label: '6 - 10', value: '6 - 10'},
              {label: '10 - 20', value: '10 - 20'},
              {label: '20+', value: '20+'},
            ]}
            value={userForm.hackathonNumber.value}
            onClick={handleDropdownChange}
            padded
            small
            required={userForm.hackathonNumber.required}
          ></Dropdown> */}
          <ExperienceLabel>previous hackathons,</ExperienceLabel>
        </FormRow>
        <FormRow style={{justifyContent: 'center'}}>
          <ExperienceLabel>and in the past year I've been to</ExperienceLabel>
          <NumberInput
            name='eventsNumber'
            type='number'
            value={userForm.eventsNumber.value}
            min={0}
            max={99}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfo([event.target.name, parseInt(event.target.value)]);
            }}
            required={userForm.hackathonNumber.required}
          />
          {/* <Dropdown
            name='eventsNumber'
            options={[
              {label: '0', value: '0'},
              {label: '1 - 5', value: '1 - 5'},
              {label: '6 - 10', value: '6 - 10'},
              {label: '10 - 20', value: '10 - 20'},
              {label: '20+', value: '20+'},
            ]}
            value={userForm.eventsNumber.value}
            onClick={handleDropdownChange}
            padded
            small
            required={userForm.eventsNumber.required}
          ></Dropdown> */}
          <ExperienceLabel>online tech events.</ExperienceLabel>
        </FormRow>
        <FormRow>
          <Dropzone
            name='resume'
            value={userForm.resume.value}
            padded
            expanded
            onUpload={handleResumeUpload}
            required={userForm.resume.required}
          />
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
            label='Github Profile'
            placeHolder='https://github.com/'
            forceLabel
            padded
            required={userForm.github.required}
            expand
          />
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='linkedin'
            value={userForm.linkedin.value}
            label='Linkedin Page'
            placeHolder='https://linkedin.com/'
            forceLabel
            padded
            required={userForm.linkedin.required}
            expand
          />
        </FormRow>
        <FormRow>
          <Input
            onChange={handleFormChange}
            type='text'
            name='website'
            value={userForm.website.value}
            label='Personal Website'
            placeHolder='https://'
            forceLabel
            padded
            required={userForm.website.required}
            expand
          />
        </FormRow>
        <FormRow>
          <FeedbackText>
            After the event, we're looking to interview some hackers regarding
            their experience. Would you be willing to participate?
          </FeedbackText>
        </FormRow>
        <FormRow>
          <Dropdown
            name='willingToInterview'
            label='Select a response'
            options={[
              {label: 'Yes', value: true},
              {label: 'No', value: false},
            ]}
            required={userForm.willingToInterview.required}
            value={userForm.willingToInterview.value}
            onClick={handleDropdownChange}
            padded
          />
        </FormRow>
        <FormRow>
          <Checkbox
            required
            name='MLHCode'
            checked={userForm.MLHCode.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfo([event.target.name, event.target.checked]);
            }}
          >
            I have read and agree to the{' '}
            <BasicLink
              href='https://static.mlh.io/docs/mlh-code-of-conduct.pdf'
              rel='noopener noreferrer external'
              target='_blank'
            >
              MLH Code of Conduct
            </BasicLink>
            .
          </Checkbox>
        </FormRow>
        <FormRow>
          <Checkbox
            required
            name='MLHPrivacy'
            checked={userForm.MLHPrivacy.value}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setInfo([event.target.name, event.target.checked]);
            }}
          >
            I authorize you to share my application/registration information for
            event administration, ranking, MLH administration, pre- and
            post-event informational e-mails, and occasional messages about
            hackathons in-line with the 
            <BasicLink
              href='https://mlh.io/privacy'
              rel='noopener noreferrer external'
              target='_blank'
            >
              MLH Privacy Policy
            </BasicLink>
            . I further agree to the terms of both the 
            <BasicLink
              href='https://github.com/MLH/mlh-policies/tree/master/prize-terms-and-conditions'
              rel='noopener noreferrer external'
              target='_blank'
            >
              MLH Contest Terms and Conditions
            </BasicLink>
             and the 
            <BasicLink
              href='https://mlh.io/privacy'
              rel='noopener noreferrer external'
              target='_blank'
            >
              MLH Privacy Policy
            </BasicLink>
            .
          </Checkbox>
        </FormRow>
        {!formIsOk ? (
          <RequiredMessage>
            All required fields must be filled.
            <br />
            Required fields are marked with a <span>•</span> symbol.
          </RequiredMessage>
        ) : (
          <></>
        )}
      </Form>
    </FormContainer>
  );

  const questions = (
    <FormContainer>
      <h3>About yourself</h3>
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
            placeHolder='Describe a passion of yours.'
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
            placeHolder='Tell us about a recent accomplishment you are proud of.'
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
      if (formIsOk) {
        submitForm(userForm);
      } else {
        alert('Please fill out all required fields');
      }

      return;
    }
    setStep(step + 1);
  };

  const actions = (
    <InteractionsContainer>
      <BackButton
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
      </BackButton>
      <MarkersContainer>
        {[...Array(SECTIONS)].map((_, index) => (
          <StepMarker key={index} done={step < index}></StepMarker>
        ))}
      </MarkersContainer>
      <ForwardButton
        disabled={step === steps.additional && !formIsOk}
        aria-label={step === steps.additional ? 'Submit' : 'Continue'}
        onClick={() => nextStep()}
      >
        <Desktop>{step === steps.additional ? 'Submit' : 'Continue'}</Desktop>
        <Mobile>
          <RightArrow
            alt='right arrow'
            src={globalTheme === 'dark' ? lightArrow : darkArrow}
          ></RightArrow>
        </Mobile>
      </ForwardButton>
    </InteractionsContainer>
  );

  return (
    <ModalLayout>
      <Prompt
        when={step === steps.additional && !formIsOk}
        message='Are you sure you want to leave?'
      />
      {currentStep()}
      {actions}
    </ModalLayout>
  );
}

export default Registration;
