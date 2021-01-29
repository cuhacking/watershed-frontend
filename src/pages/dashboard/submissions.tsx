import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import {Link} from 'react-router-dom';

const sampleProjects: ProjectPreview[] = [
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
  {
    name: 'Project Atlas',
    team: 'cuHacking dev-team',
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg',
  },
];

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
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.5rem;
  margin-top: 2rem;
`;

const SubmitButton = styled(Link)`
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 0.5rem;
  border: none;
  background: var(--actionGradient);
  margin-top: 2rem;
  color: var(--white);
  font-size: 1.5rem;
  font-family: var(--primary-font);

  &:hover {
    cursor: pointer;
    box-shadow: var(--card-shadow-hover);
  }
`;

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: calc(25% - 1rem);
  height: 148px;
  border-radius: 0.5rem;
  background-color: lightblue;
  color: var(--white);
  margin: 0.5rem;
  justify-content: flex-end;
  transition: box-shadow 200ms;
  position: relative;
  overflow: hidden;

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
  backgroundURL: string;
}

const Submissions = () => {
  const [projects, setProjects] = useState<ProjectPreview[]>([]);

  useEffect(() => {
    setProjects(sampleProjects);
  }, []);

  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Schedule'
      />
      <Spacer />
      <Container>
        <Header>
          <h2>Submissions</h2>
          <label>Check out what other hackers have built</label>
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
              style={{
                background: `url(${project.backgroundURL})`,
              }}
              key={index}
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
