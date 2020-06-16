import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { requestGetNotes, selectUser } from './noteSlice';
import { NoteListItem } from './NoteListItem';
import './NoteList.scss';

export const NoteList = () => {
  const dispatch = useDispatch();
  const { userId } = useSelector(selectUser);

  useEffect(() => {
    const fetchData = async() => {
      await dispatch(requestGetNotes(userId));
    }
    fetchData();
    // eslint-disable-next-line
  },[dispatch])
  const notes = useSelector((state) => state.notes.allNotes);
  const notesList = notes.map(note => {
    return (
      <NoteListItem key={note.id} note={note} />
    );
  });

  if (notesList.length >= 1) {
    return (
      <ul>
        { notesList }
      </ul>
    );
  } else {
    return (
      <div className="no-notes">
        <div>
          <p className="message">You don't have any notes yet!</p>
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
