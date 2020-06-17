import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './notes/noteSlice';
import { AuthLink } from './AuthLink';
import './Header.scss';

export const Header = () => {

  const { loggedIn } = useSelector(selectUser);

  return (
    <header id="header">
      <nav>
        <ul className="nav-list">
          <li className="nav-item main">
            <Link
              to={ loggedIn ? '/notes' : '/'}
              className="nav-link all-notes">
              All Notes
            </Link>
          </li>
          { loggedIn ?
            <li className="nav-item settings">
            <Link
              to="/settings"
              className="nav-link">
              Settings
            </Link>
          </li> : null
          }
          <li className="nav-item auth">
            <AuthLink loggedIn={loggedIn} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
