import React from 'react';
import styled from 'styled-components';

function sizeToPercentDesktop(size: number) {
  if (size === 1) {
    return '10vw';
  } else if (size === 2) {
    return '15vw';
  } else if (size === 3) {
    return '22vw';
  } else {
    return '30vw';
  }
}

function sizeToPercentMobile(size: number) {
    if (size === 1) {
      return '40vw';
    } else if (size === 2) {
      return '50vw';
    } else if (size === 3) {
      return '65vw';
    } else {
      return '80vw';
    }
  }

const SponsorLogo = styled.img<{size: number}>`
  width: ${({size}) => sizeToPercentMobile(size)};
  margin: 32px;

  @media only screen and (min-width: 1200px) {
    width: ${({size}) => sizeToPercentDesktop(size)};
  }
`;

export const Sponsor = (props: {name: string; logo: string; size: number; url: string}) => {
  return (
    <a href={props.url}>
      <SponsorLogo alt={`${props.name} logo`} size={props.size} src={props.logo} />
    </a>
  );
};
