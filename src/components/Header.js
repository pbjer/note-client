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
          <li className="nav-item">
            <Link
              to={ loggedIn ? '/notes' : '/'}
              className="nav-link all-notes">
              All Notes
            </Link>
          </li>
          <li className="nav-item">
            <AuthLink loggedIn={loggedIn} />
          </li>
        </ul>
      </nav>
    </header>
  );
}
