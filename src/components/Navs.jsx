import React from 'react';
import { useLocation } from 'react-router-dom';
import { LinkStyled, NavList } from './Navs.Styled';

const LINKS = [
  { to: '/', text: 'Home' },
  { to: '/starred', text: 'Starred' },
];

const Navs = () => {
  const location = useLocation();
  // The useLocation hook returns the location object that represents the current URL. You can think about it like a useState that returns a new location whenever the URL changes.
  return (
    <div>
      <NavList>
        {LINKS.map(item => (
          <li key={item.to}>
            <LinkStyled
              to={item.to}
              className={item.to === location.pathname ? 'active' : ''}
            >
              {item.text}
            </LinkStyled>
          </li>
        ))}
      </NavList>
    </div>
  );
};

export default Navs;
