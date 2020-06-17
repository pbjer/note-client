import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './notes/noteSlice';
import './NoMatch.scss';

export const NoMatch = () => {
  const { loggedIn } = useSelector(selectUser);
  return (
    <div className="lost">
      <div className="welcome">
        <span
          className="map-emoji"
          role="img"
          aria-label="world map emoji">
          🗺️
        </span>
        <h1 className="header">
          Seems you've lost your way, friend
        </h1>
        <p className="subheader">
          No worries though, this button will get you where you need to go
        </p>
        <Link
          to={loggedIn ? `/notes` : '/'}
          className="btn btn-primary">
          Go to { loggedIn ? 'notes' : '/' }
        </Link>
      </div>
    </div>
  );
}
