import React, {useState} from 'react';
import styled from 'styled-components';
import {Link, useRouteMatch} from 'react-router-dom';
import {useScrollPosition} from '@n8tb1t/use-scroll-position';
import {ReactComponent as WordLogo} from 'assets/img/word-logo-white.svg';
import MenuButton from './menuButton';

const StyledHeader = styled.header<{
  isOpen: boolean;
  isDark: boolean;
  fixed: boolean;
}>`
  position: ${({fixed}) => (fixed ? 'fixed' : 'absolute')};
  box-shadow: ${({isDark}) =>
    isDark ? '0px 0px 5px rgba(0, 0, 0, 0.1)' : 'unset'};
  top: ${({isOpen, isDark, fixed}) =>
    !fixed || isDark || isOpen ? 0 : '-65px'};
  left: 0;
  z-index: 1;
  overflow: hidden;
  color: ${({isDark}) => (isDark ? 'var(--white)' : 'var(--white)')};

  display: flex;
  flex-direction: column;
  width: 100vw;
  height: ${(props) => (props.isOpen ? '25rem' : '65px')};
  justify-content: flex-start;
  align-items: center;

  background-color: ${({isOpen, fixed}) =>
    fixed || isOpen ? 'var(--black)' : 'transparent'};

  transition: 0.2s cubic-bezier(0.17, 0.84, 0.44, 1);

  @media only screen and (min-width: 700px) {
    height: 65px;
    transition: 0.3s cubic-bezier(0.17, 0.84, 0.44, 1);
    background-color: ${({fixed}) => (fixed ? 'var(--black)' : 'transparent')};
  }
`;

const NavBar = styled.nav<{banner: boolean}>`
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  padding-right: 0px;

  width: var(--mobile-width);

  @media only screen and (min-width: 1200px) {
    max-width: var(--max-width);
    padding-right: ${({banner}) => (banner ? '164px' : '0')};
  }
`;

const StyledLogo = styled(WordLogo)`
  width: 140px;
  height: 65px;
`;

const ButtonDiv = styled.div`
  display: none;

  @media only screen and (min-width: 700px) {
    display: flex;
    flex-direction: row;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-end;
  width: var(--mobile-width);
  color: var(--white);

  @media only screen and (min-width: 700px) {
    display: none;
  }
`;

const NavButton = styled.a`
  text-align: right;
  font-size: 2rem;
  margin: 0.5rem 0;

  @media only screen and (min-width: 700px) {
    font-size: 1.125rem;
    margin: 0 0 0 40px;

    &:hover {
      color: var(--vanilla) !important;
    }
  }
`;

const Header = (props: {fixed: boolean; banner?: boolean}) => {
  const [isOpen, setOpen] = useState(false);
  const [isDark, setDark] = useState(false);
  const isHome = useRouteMatch('/');

  useScrollPosition(
    ({currPos}) => {
      const shouldBeDark = currPos.y < (isHome ? -800 : -350);
      if (shouldBeDark !== isDark) setDark(shouldBeDark);
    },
    [isDark]
  );

  return (
    <StyledHeader isOpen={isOpen} isDark={isDark} fixed={props.fixed}>
      <NavBar banner={props.banner === true}>
        <Link aria-label="Home" to='/'>
          <StyledLogo />
        </Link>
        <MenuButton isOpen={isOpen} onClick={() => setOpen(!isOpen)} />
        <ButtonDiv>
          <NavButton href='/#about'>About</NavButton>
          <NavButton href='/#schedule'>Schedule</NavButton>
          <NavButton href='/#sponsors'>Sponsors</NavButton>
          <NavButton href='/#FAQ'>FAQ</NavButton>
          {/* <NavButton href='/dashboard/login'>Login</NavButton> */}
        </ButtonDiv>
      </NavBar>
      <NavMenu>
        <NavButton href='/#about'>About</NavButton>
        <NavButton href='/#schedule'>Schedule</NavButton>
        <NavButton href='/#sponsors'>Sponsors</NavButton>
        <NavButton href='/#FAQ'>FAQ</NavButton>
        {/* <NavButton href='/dashboard/login'>Login</NavButton> */}
      </NavMenu>
    </StyledHeader>
  );
};
export default Header;
