import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Header } from './Header';
import { Home } from './components/Home';
import { AuthCallback } from './components/AuthCallback';
import { NoteList } from './components/notes/NoteList';
import { NoteForm } from './components/notes/NoteForm';
import './styles/styles.scss';
import './App.scss';

export const App = () => {
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
            path="/auth-callback"
            component={AuthCallback} />
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
