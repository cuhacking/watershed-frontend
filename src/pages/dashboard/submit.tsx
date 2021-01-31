import React, {useCallback, useEffect, useState} from 'react';
import styled, {keyframes} from 'styled-components';
import {useParams, Redirect, Link, useHistory} from 'react-router-dom';
import {SidebarLayout} from '../../layouts';
import {useDropzone, FileRejection, DropEvent} from 'react-dropzone';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {useAuth, useDashboardInfo} from '../../hooks';
import {Helmet} from 'react-helmet';
import {LoadingSymbol} from '../../components';

const Spacer = styled.div`
  height: 10vh;
`;

const LargeSpacer = styled.div`
  height: 30vh;
`;

const SmallSpacer = styled.div`
  height: 32px;
`;

const fade = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const FormContainer = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  animation: ${fade} 0.2s cubic-bezier(0.33, 1, 0.68, 1) 1;
`;

const Title = styled.h1``;
const Subtitle = styled.h2``;

const SubSubtitle = styled.h3``;

const Input = styled.input`
  border: 0;
  height: 48px;
  border-bottom: 1px solid;
  margin-top: 16px;
  font-size: 1.1em;
`;

const HelperText = styled.p`
  width: 80%;
  margin: 6px 0;
  font-size: 0.9em;
`;

const DropContainer = styled.div`
  width: 100%;
  height: 64px;
  color: var(--white);
  background: var(--wineLight);
  text-align: center;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 8px 0 42px;
`;

const StyledLink = styled(Link)`
  color: var(--wineLight) !important;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledMarkdown = styled(ReactMarkdown)`
  width: calc(100% - 32px);
  background: var(--white);
  overflow-x: auto;
  margin: 16px;
`;

const SubmissionPreviewCard = styled.div`
  border-radius: 8px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  overflow: hidden;
  margin-bottom: 16px;
`;

const Placeholder = styled.i`
  opacity: 0.5;
`;

const SubmissionScrim = styled.div`
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0) 27.92%,
    rgba(0, 0, 0, 0.5) 100%
  );
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: var(--white);
  padding: 16px;

  & h3 {
    margin: 0;
  }

  & p {
    margin: 0;
  }

  & a {
    margin-top: 4px;
  }
`;

const SubmissionCover = styled.div<{url?: string}>`
  width: 100%;
  height: 172px;
  background: ${({url}) =>
    url ? `var(--white) url(${[url]}) no-repeat center center` : 'var(--wine)'};
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 64px;
  background: linear-gradient(
      307.69deg,
      rgba(254, 205, 125, 0.5) 0%,
      rgba(255, 255, 255, 0) 96.5%
    ),
    linear-gradient(0deg, #89072e, #89072e);
  border: 0;
  border-radius: 8px;
  margin-bottom: 16px;
  cursor: pointer;
  color: var(--white);
  font-family: var(--secondary-font);
  font-size: 16px;

  transition: 100ms ease-out;
  box-shadow: var(--card-shadow);

  &:hover {
    box-shadow: var(--card-shadow-hover);
  }
`;

// From Stackoverflow
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const Dropzone = (props: {file?: File; onFileChange: (file: File) => void}) => {
  const onDrop = useCallback(
    (
      acceptedFiles: File[],
      fileRejections: FileRejection[],
      event: DropEvent
    ) => {
      if (acceptedFiles.length > 0) {
        props.onFileChange(acceptedFiles[0]);
      }
    },
    []
  );

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5000000,
    accept: ['image/png', 'image/jpeg'],
  });
  return (
    <DropContainer {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop your image here...</p>
      ) : props.file ? (
        <p>
          {props.file.name} ({formatBytes(props.file.size)})
        </p>
      ) : (
        <p>Select your photo (max. 5MB)</p>
      )}
    </DropContainer>
  );
};

const submitMessage = (
  name: string,
  repo: string,
  video: string,
  readme: string | null
) => {
  if (name === '') {
    return 'You must provide a name';
  } else if (repo === '') {
    return 'You must provide a git repository';
  } else if (video === '') {
    return 'You must provide a link to a video demo';
  } else if (readme == null || readme === '') {
    return 'Could not find a valid README.md file in repo';
  }

  return null;
};

const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 8px 0;
`;

const ChallengeContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChallengeCheck = (props: {
  value: string;
  name: string;
  onChange: (value: string, checked: boolean) => void;
}) => {
  const [isChecked, setChecked] = React.useState(false);
  const handleChange = () => {
    setChecked((checked) => {
      props.onChange(props.value, !checked);
      return !checked;
    });
  };
  return (
    <CheckContainer>
      <input
        id={props.value}
        type='checkbox'
        checked={isChecked}
        onChange={handleChange}
      />
      <label htmlFor={props.value}>{props.name}</label>
    </CheckContainer>
  );
};

export default () => {
  const {request, user} = useAuth();

  const history = useHistory();
  const {dashboard} = useDashboardInfo();
  const [name, setName] = useState<string>('');
  const [repo, setRepo] = useState<string>('');
  const [video, setVideo] = useState<string>('');
  const [image, setImage] = useState<File | undefined>();
  const [imageUrl, setImageUrl] = useState<string | undefined>();
  const [challenges, setChallenges] = useState<string[]>([]);

  const [readme, setReadme] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);

  const [isLoading, setLoading] = useState(true);
  const [ableToSubmit, setAbleToSubmit] = useState(true);

  const handleRepoChange = (repo: string) => {
    setRepo(repo);
    if (repo) {
      request('/api/submission/preview/' + encodeURIComponent(repo))
        .then((res) => {
          if (res.ok) {
            return res.text();
          } else {
            throw 'No readme';
          }
        })
        .then((text) => setReadme(text))
        .catch(() => {
          setReadme(null);
        });
    }
  };

  const handleChallengeChange = (value: string, checked: boolean) => {
    setChallenges((challenges) => {
      if (checked) {
        return [...challenges, value];
      } else {
        return challenges.filter((item) => item !== value);
      }
    });
  };

  const handleSubmit = () => {
    const message = submitMessage(name, repo, video, readme);

    if (!message) {
      setMessage(null);

      const payload = new FormData();
      payload.append(
        'body',
        JSON.stringify({name, repoUrl: repo, videoLink: video, challenges})
      );

      if (image) {
        payload.append('cover', image, image.name);
      }
      request('/api/submission/', {
        method: 'POST',
        body: payload,
      })
        .then((response) => {
          if (response.ok) {
            setSubmitted(true);
          } else {
            setMessage('An error occurred');
          }
        })
        .catch(() => {
          setMessage('An error occurred');
        });
    } else {
      setMessage(message);
    }
  };

  useEffect(() => {
    // hopefully nobody changes their local time
    if (dashboard) {
      const diff = Date.now() - Date.parse(dashboard.endTime);

      // 15min grace period
      if (
        diff > 900000 ||
        (dashboard.user.team && dashboard.user.team.submission)
      ) {
        setAbleToSubmit(false);
      }
      setLoading(false);
    }
  }, [dashboard]);

  useEffect(() => {
    if (image != null) {
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(image);
    }
  }, [image]);

  if (isLoading) {
    return (
      <SidebarLayout>
        <LoadingSymbol color='var(--wine)' />
      </SidebarLayout>
    );
  }

  if (dashboard!.user.team == null) {
    return (
      <SidebarLayout>
        <LargeSpacer />
        <Title>Please join a team to submit a project.</Title>
        <Subtitle>
          Check out other submissions on our submissions page!
        </Subtitle>
        <SubSubtitle>
          If you're rolling solo, join a team with just you in it.
        </SubSubtitle>
        <SubmitButton
          onClick={() => {
            history.push('/dashboard/submissions');
          }}
        >
          See other submissions
        </SubmitButton>
      </SidebarLayout>
    );
  }

  if (submitted) {
    return (
      <SidebarLayout>
        <LargeSpacer />
        <Title>Your project has been submitted!</Title>
        <Subtitle>You can sit back and relax now.</Subtitle>
        <SubmitButton
          onClick={() => {
            history.push('/dashboard/submissions');
          }}
        >
          See other submissions
        </SubmitButton>
      </SidebarLayout>
    );
  }

  if (!ableToSubmit) {
    return (
      <SidebarLayout>
        <LargeSpacer />
        <Title>Submissions are now closed.</Title>
        <Subtitle>
          Check out other submissions on our submissions page!
        </Subtitle>
        <SubmitButton
          onClick={() => {
            history.push('/dashboard/submissions');
          }}
        >
          See other submissions
        </SubmitButton>
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Submit your hack!'
      />
      <Spacer />
      <FormContainer>
        <Title>Submit your hack!</Title>
        <Subtitle>
          Only one submission per team is allowed, and all text fields are
          required.
        </Subtitle>
        <Input
          placeholder='Project Name'
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setName(e.target.value);
          }}
        />
        <Input
          placeholder='Git Repository URL'
          value={repo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            handleRepoChange(e.target.value);
          }}
        />
        <HelperText>
          Your project must be hosted as a publicly accessible git repository.{' '}
          <b>The repository must contain a README.md file</b> that will be used
          as your project's description.
        </HelperText>
        <HelperText>
          The description will be visible to other hackers and will also be used
          by our judges to judge your submission.
        </HelperText>

        <Input
          placeholder='Video Demo URL'
          value={video}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setVideo(e.target.value);
          }}
        />
        <HelperText>
          A link to a video (up to three minutes) demonstrating your project.
        </HelperText>
        <HelperText>
          We recommend uploading your video to the cloud (Google Drive, Dropbox,
          OneDrive, etc.) and creating a <b>publicly shareable link</b>.
        </HelperText>
        <SmallSpacer />
        <SubSubtitle>Cover Photo (optional)</SubSubtitle>
        <HelperText>
          A photo that represents your hack. Avoid having large text in the
          image.
        </HelperText>
        <Dropzone file={image} onFileChange={setImage} />
        <SubSubtitle>Challenges</SubSubtitle>
        <HelperText>
          Select the challenges you would like your hack to be considered for.
          See more details about these on the{' '}
          <StyledLink to='/dashboard/challenges'>Challenges Page</StyledLink>.
        </HelperText>
        <ChallengeContainer style={{marginTop: 8}}>
          <ChallengeCheck
            value='ros-challenge'
            name='Fan Engage-O-meter'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='ciena-challenge'
            name='Diversity & Inclusion Award'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='echoAR-challenge'
            name='Best Hack Using echoAR'
            onChange={handleChallengeChange}
          />
        </ChallengeContainer>
        <ChallengeContainer>
          <ChallengeCheck
            value='best-green-hack'
            name='Best "Green" Hack'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='best-health-hack'
            name='Best Health Hack'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='best-game'
            name='Best Game'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='best-educational-hack'
            name='Best Educational Hack'
            onChange={handleChallengeChange}
          />
        </ChallengeContainer>
        <ChallengeContainer style={{marginBottom: 24}}>
          <ChallengeCheck
            value='mlh-google-cloud'
            name='Best Use of Google Cloud'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='best-domain-registered'
            name='Best Domain Registered'
            onChange={handleChallengeChange}
          />
          <ChallengeCheck
            value='best-hardware-hack'
            name='Best Hardware Hack'
            onChange={handleChallengeChange}
          />
        </ChallengeContainer>
        <SubSubtitle>Submission Preview</SubSubtitle>
        <SubmissionPreviewCard>
          <SubmissionCover url={imageUrl}>
            <SubmissionScrim>
              <h3>
                {name === '' ? <Placeholder>Project Name</Placeholder> : name}
              </h3>
              <p>{dashboard?.user.team?.name}</p>
              <a href={repo}>{repo}</a>
            </SubmissionScrim>
          </SubmissionCover>
          {readme != null && (
            <StyledMarkdown plugins={[gfm]}>{readme}</StyledMarkdown>
          )}
        </SubmissionPreviewCard>
        {message && <HelperText>{message}</HelperText>}
        <SubmitButton onClick={handleSubmit}>Submit your hack!</SubmitButton>
      </FormContainer>
    </SidebarLayout>
  );
};
