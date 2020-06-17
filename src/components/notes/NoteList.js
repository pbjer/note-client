import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  requestGetNotes,
  selectUser,
  selectSortAscending,
  selectAllNotes,
  toggleSortAscending,
  selectLimit,
  selectStart,
  selectPagination,
  setStart,
  selectTotalResults,
} from './noteSlice';
import { NoteListItem } from './NoteListItem';
import './NoteList.scss';

export const NoteList = () => {
  const dispatch = useDispatch();

  const { userId } = useSelector(selectUser);
  const sort = useSelector(selectSortAscending);
  const pagination = useSelector(selectPagination);
  const limit = useSelector(selectLimit);
  const start = useSelector(selectStart);
  const totalResults = useSelector(selectTotalResults);

  useEffect(() => {
    const fetchData = async() => {
      const payload = { userId, sort, pagination, limit, start };
      await dispatch(requestGetNotes(payload));
    }
    fetchData();
    // eslint-disable-next-line
  },[dispatch, sort, start]);

  const nextPossible = () => {
    return start + limit < totalResults;
  }
  const handleNext = () => {
    if (nextPossible()) {
      dispatch(setStart(start + limit));
    }
  };

  const prevPossible = () => {
    return start - limit >= 0;
  }
  const handlePrev = () => {
    if (prevPossible()) {
      dispatch(setStart(start - limit));
    }
  };

  const notes = useSelector(selectAllNotes);
  const notesList = notes.map(note => {
    return (
      <NoteListItem key={note.id} note={note} />
    );
  });

  if (notesList.length >= 1) {
    return (
      <div>
        <div className="list-options">
          <div>
            <span className="sort-message">
              Sorting by
            </span>
            <button
              className="sort-button"
              onClick={() => dispatch(toggleSortAscending())}>
              { sort ? 'oldest first' : 'most recent' }
            </button>
          </div>
          <Link
            className="btn btn-primary"
            to="new-note">
            + New note
          </Link>
        </div>
        <ul>
          { notesList }
        </ul>
        {
          pagination ? (
            <div className="page-nav">
              <button
                className={`pagination-btn ${!prevPossible() ? 'disabled' : '' }`}
                onClick={() => handlePrev()}
                disabled={!prevPossible()}>Prev</button>
              <button
                className={`pagination-btn ${!nextPossible() ? 'disabled' : '' }`}
                onClick={() => handleNext()}
                disabled={!nextPossible()}>Next</button>
            </div>
          ) : null
        }
      </div>
    );
  } else {
    return (
      <div className="no-notes">
        <div>
          <p className="message">
            You don't have any notes yet!
          </p>
          <Link
            className="btn btn-primary"
            to="/new-note">
            Create a note
          </Link>
        </div>
      </div>
    );
  }
}
