import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setUser } from './notes/noteSlice';

export const AuthLink = (props) => {
  const dispatch = useDispatch();
  const { loggedIn } = props;

  const handleLogout = () => {
    Cookies.remove('token');
    dispatch(setUser({
      loggedIn: false,
      userId: ''
    }));
  }

  if (!loggedIn) {
    return (
      <a
        href={`${process.env.REACT_APP_API_ROOT}/auth/google`}
        className="nav-link auth-link">
        Sign in
      </a>
    )
  } else {
    return (
      <Link
        to="/"
        className="nav-link auth-link"
        onClick={() => handleLogout()}>
        Log out
      </Link>
    )
  }
}
