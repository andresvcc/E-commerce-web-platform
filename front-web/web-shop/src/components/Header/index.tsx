import React from 'react';
import { NavBar } from 'ui-ux';

function Header() {
  return (
    <NavBar bgcolor="#ae37b4" bgGradient="#c42121" height="3rem" textcolor="#ffffff">
      <div id="logos">
        <div data-testid="vite-logo" />
        <div data-testid="react-logo" />
      </div>
      <h2>TEST thymio suite v3</h2>
    </NavBar>
  );
}

export default Header;
