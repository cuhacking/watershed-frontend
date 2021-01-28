import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import { Link } from 'react-router-dom';

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

const ProjectCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  width: 264px;
  height: 148px;
  border-radius: 1rem;
  background-color: lightblue;
  color: var(--white);
  margin: 0.5rem;
  justify-content: flex-end;
  transition: box-shadow 200ms;

  &:hover {
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.5);
  }

  & h3,
  p {
    margin: 0;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  text-align: center;
  padding: 1rem;
  border-radius: 1rem;
  border: none;
  background: var(--wine)
    linear-gradient(to right, rgba(255, 255, 255, 0), rgba(254, 205, 125, 0.75));
  margin-top: 2rem;
  color: var(--white);
  font-size: 1.5rem;
  font-family: var(--primary-font);
`;

interface ProjectPreview {
  name: string;
  team: string;
  backgroundURL: string;
}

const Submissions = () => {
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState<ProjectPreview[]>(sampleProjects);
  const [currentProjects, setCurrentProjects] = useState<ProjectPreview[]>([]);
  const PAGE_OFFSET = 12;

  useEffect(() => {
    const start = page * PAGE_OFFSET;
    const previews: ProjectPreview[] = [];
    for (let i = start; i < start + PAGE_OFFSET; i++) {
      console.log(projects[i]);
      if (projects[i] !== null) {
        previews.push(projects[i]);
      }
    }
    setCurrentProjects(previews);
  }, [page]);

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
        <SubmitButton>
          <Link to="/dashboard/submit">Submit your hack</Link>
        </SubmitButton>
        <ProjectsDisplay>
          {currentProjects.map((project, index) => (
            <ProjectCard
              style={{
                background: `url(${project.backgroundURL})`,
              }}
              key={index}
            >
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
