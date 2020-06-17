import React from 'react';
import './Home.scss';

export const Home = () => {
  return (
    <div className="home">
      <div className="welcome">
        <span
          className="note-emoji"
          role="img"
          aria-label="notepad and pencil">
          📝
        </span>
        <h1 className="header">
          Welcome to All Notes
        </h1>
        <p className="subheader">
          All notes isn't just notes... it's all the notes
        </p>
        <a
          href={`${process.env.REACT_APP_API_ROOT}/auth/google`}
          className="btn btn-primary">
          Sign in with Google
        </a>
      </div>
    </div>
  );
}
