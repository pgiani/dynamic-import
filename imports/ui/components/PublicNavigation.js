import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Nav, NavItem } from 'react-bootstrap';

const PublicNavigation = () => (
  <Nav pullRight>
    <LinkContainer to="/">
      <NavItem eventKey={ 1 } href="/">Example</NavItem>
    </LinkContainer>
    <NavItem eventKey={ 2 } href="https://code.zeroasterisk.com/">Blog Post</NavItem>
  </Nav>
);

export default PublicNavigation;
