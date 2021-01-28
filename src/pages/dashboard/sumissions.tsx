import { useState } from 'react';
import styled from 'styled-components';

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
    backgroundURL: 'https://i.ytimg.com/vi/r8ZeGZOXREs/maxresdefault.jpg/',
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
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;

  & label {
    margin-top: 1rem;
  }
`;

const ProjectsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

interface ProjectPreview {
  name: string;
  team: string;
  backgroundURL: string;
}

const Submissions = () => {
  const [page, setPage] = useState(0);
  const [projects, setProjects] = useState([]);
  const PAGE_OFFSET = 6;

  const currentProjects = () => {

  };

  return (
    <Container>
      <Header>
        <h2>Submissions</h2>
        <label>Check out what other hackers have built</label>
      </Header>
      <ProjectsDisplay>{}</ProjectsDisplay>
    </Container>
  );
}

export default Submissions;
