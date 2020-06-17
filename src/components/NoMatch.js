import React from 'react';
import { Link } from 'react-router-dom';
import './NoMatch.scss';

export const NoMatch = () => {
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
          No worries though, this button will take you home
        </p>
        <Link
          to="/"
          className="btn btn-primary">
          Go to home
        </Link>
      </div>
    </div>
  );
}
