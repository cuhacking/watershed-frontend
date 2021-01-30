import React from 'react';
import styled from 'styled-components';
import {SidebarLayout} from '../../layouts';
import {Helmet} from 'react-helmet';
import ravensBackground from '../../assets/img/ravens-background.png';
import {hi} from 'date-fns/locale';

const Spacer = styled.div`
  height: 5vh;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 0 2rem;
`;

const RavensQuest = () => {
  return (
    <SidebarLayout>
      <Helmet
        titleTemplate={`%s — cuHacking 2021 Dashboard`}
        title="Raven's quest"
      />
      <Spacer />
      <Container>
        <img
          style={{
            height: '100%',
            width: '100%',
            boxShadow: 'var(--shadow)'
          }}
          src={ravensBackground}
        />
      </Container>
      <Spacer />
    </SidebarLayout>
  );
};

export default RavensQuest;
