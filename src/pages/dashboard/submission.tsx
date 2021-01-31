import React, {useEffect} from 'react';
import styled, {keyframes} from 'styled-components';
import {useParams} from 'react-router-dom';
import {SidebarLayout} from '../../layouts';
import ReactMarkdown from 'react-markdown';
import gfm from 'remark-gfm';
import {EventLoading} from '../../shared/events';
import {faExternalLinkAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

interface Project {
  submission: Submission;
  cover: string;
  team: {name: string};
}

interface Submission {
  id: string;
  projectName: string;
  repo: string;
  readmeText: string;
  demoVideo: string;
}

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

  & h2 {
    margin: 0;
  }

  & p {
    margin: 0;
  }
`;

const SubmissionCover = styled.div<{url?: string}>`
  width: 100%;
  height: 172px;
  background: ${({url}) =>
    url ? `var(--white) url(${[url]}) no-repeat center center` : 'var(--wine)'};
`;

const Links = styled.div`
  margin-top: 16px;

  & a {
    margin-top: 4px;
  }

  & a:hover {
    text-decoration: underline;
  }

  a svg {
    margin-left: 0.25em;
  }
`;

export default () => {
  const {id} = useParams<{id: string}>();

  const [project, setProject] = React.useState<Project | undefined>();

  useEffect(() => {
    fetch('/api/submission/' + id)
      .then((res) => res.json())
      .then((json) => {
        setProject(json as Project);
      });
  }, []);

  if (project == null) {
    return (
      <SidebarLayout>
        <EventLoading />
      </SidebarLayout>
    );
  }

  return (
    <SidebarLayout>
      <Spacer />
      <FormContainer>
        <SubmissionPreviewCard>
          <SubmissionCover url={project.cover}>
            <SubmissionScrim>
              <h2>{project.submission.projectName}</h2>
              <p>{project.team?.name}</p>

              <Links>
                <a
                  href={project.submission.repo}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Repository
                  <FontAwesomeIcon icon={faExternalLinkAlt} size='1x' />
                </a>
                {'   •   '}
                <a
                  href={project.submission.demoVideo}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Demo Video
                  <FontAwesomeIcon icon={faExternalLinkAlt} size='1x' />
                </a>
              </Links>
            </SubmissionScrim>
          </SubmissionCover>
          {project.submission.readmeText != null && (
            <StyledMarkdown plugins={[gfm]}>
              {project.submission.readmeText}
            </StyledMarkdown>
          )}
        </SubmissionPreviewCard>
      </FormContainer>
    </SidebarLayout>
  );
};
