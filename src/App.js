import React from 'react';
import { useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import jwtDecode from 'jwt-decode';
import { setUser } from './components/notes/noteSlice';
import { Header } from './components/Header';
import { Home } from './components/Home';
import { NoteList } from './components/notes/NoteList';
import { NoteForm } from './components/notes/NoteForm';
import './styles/styles.scss';
import './App.scss';

export const App = () => {
  const dispatch = useDispatch();
  const token = Cookies.get('token');
  if (token !== undefined) {
    const { id } = jwtDecode(token);
    dispatch(setUser({ userId:id, loggedIn: true }));
  }

  return (
    <div id="app-wrapper">
      <Router>
        <Header />
        <Switch>
          <Route
            exact
            path="/"
            component={Home}/>
          <Route
            path="/notes"
            component={NoteList} />
          <Route
            exact
            path="/new-note"
            component={NoteForm} />
          <Route
            exact
            path="/note/:id"
            component={NoteForm} />
        </Switch>
      </Router>
    </div>
  );
}
