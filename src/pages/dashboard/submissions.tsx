import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 6rem;
`;

const Spacer = styled.div`
  height: 10vh;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
`;

const ProjectsDisplay = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;
  grid-column-gap: 20px;

  padding: 20px 0;

  @media only screen and (min-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1200px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1500px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media only screen and (min-width: 1800px) {
    grid-template-columns: repeat(5, minmax(0, 1fr));
  }

  @media only screen and (min-width: 2100px) {
    grid-template-columns: repeat(6, minmax(0, 1fr));
  }
`;

const SubmitButton = styled(Link)`
  width: 100%;

  border-radius: 8px;
  border: none;
  padding: 16px;
  margin-top: 32px;

  background: var(--action-gradient);
  color: var(--white);

  text-align: center;
  font-size: 1.5rem;
  font-family: var(--primary-font);
  transition: 100ms ease-out;
  box-shadow: var(--card-shadow);

  &:hover {
    cursor: pointer;
    box-shadow: var(--card-shadow-hover);
  }
`;

const ProjectCard = styled(Link)`
  position: relative;
  overflow: hidden;

  width: 100%;
  height: 148px;

  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  border-radius: 8px;
  padding: 20px;

  background-color: lightblue;
  color: var(--white) !important;
  transition: box-shadow 200ms;

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  }

  & h3,
  p {
    margin: 0;
    z-index: 2;
  }
`;

const ProjectOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: 1;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.75));
`;

interface ProjectPreview {
  name: string;
  team: string;
  repo: string;
  cover: string;
}

const Submissions = () => {
  const [projects, setProjects] = useState<ProjectPreview[]>([]);
  useEffect(() => {
    fetch('/api/submission')
      .then((res) => res.json())
      .then((json) => {
        setProjects(json as ProjectPreview[]);
      });
  }, []);

  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Submissions'
      />
      <Spacer />
      <Container>
        <Header>
          <h2>Submissions</h2>
          <label>Check out what other hackers have built.</label>
        </Header>
        <SubmitButton
          style={{
            color: 'var(--white)',
          }}
          to='/dashboard/submit'
        >
          Submit your hack
        </SubmitButton>
        <ProjectsDisplay>
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              to={`/dashboard/submissions/${encodeURIComponent(project.repo)}`}
              style={{
                background: `url(${project.cover})`,
              }}
            >
              <ProjectOverlay />
              <h3>{project.name}</h3>
              <p>{project.team}</p>
            </ProjectCard>
          ))}
        </ProjectsDisplay>
        <Spacer />
      </Container>
    </SidebarLayout>
  );
};

export default Submissions;
