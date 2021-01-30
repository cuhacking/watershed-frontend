import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';

const Spacer = styled.div`
  height: 5vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 4rem;
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const RavensQuest = () => {
  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title='Schedule'
      />
      <Spacer />
      <Container>
        <Header>
          <h1>Raven's Quest</h1>
          <label>The cuHacking challenge begins here</label>
        </Header>
      </Container>
    </SidebarLayout>
  );
};

export default RavensQuest;
