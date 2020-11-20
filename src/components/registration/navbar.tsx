import React from "react";
import styled from "styled-components";

const Nav = styled.nav`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0.5rem 1rem;

  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const NavbarBrand = styled.div`
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
`;

const NavbarRight = styled.ul`
  display: flex;
  justify-content: flex-end;
  list-style: none;
`;

const Items = styled.li``;

const Navbar = () => {
  return (
    <Nav>
      <NavbarBrand>cuHacking</NavbarBrand>

      <NavbarRight>
        <Items>about</Items>
        <Items>sponsors</Items>
        <Items>FAQs</Items>
        <Items>login</Items>
      </NavbarRight>
    </Nav>
  );
};

export default Navbar;
