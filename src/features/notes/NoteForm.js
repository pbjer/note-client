import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import {
  requestCreateNote,
  requestUpdateNote,
  requestGetNoteById,
  requestDeleteNote,
  selectCurrentNote,
  setCurrentTitle,
  setCurrentBody,
  clearCurrentNote,
  selectUser,
} from './noteSlice';
import './NoteForm.scss'

export const NoteForm = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const params = useParams();
  const { title, body } = useSelector(selectCurrentNote);

  const { userId } = useSelector(selectUser);
  const id = params.id ? params.id : null;
  useEffect(() => {
    if (id !== null) {
      dispatch(requestGetNoteById({ id, userId }));
    }
    return () => {
      dispatch(clearCurrentNote());
    }
    // eslint-disable-next-line
  },[id, dispatch]);

  // resizes the textarea on line additions and
  // removals for a simple user experience
  const bodyRef = useCallback(node => {
    if(node!== null) {
      resizeTextArea(node);
    }
    // eslint-disable-next-line
  }, [ body ]);
  const resizeTextArea = (ref) => {
    ref.style.height = 'inherit';
    ref.style.height = `${ref.scrollHeight + 10}px`;
  }
  const handleBodyInput = (e) => {
    dispatch(setCurrentBody(e.target.value));
    resizeTextArea(e.target);
  }

  const formIncomplete = () => {
    return (title === '' || body === '');
  }
  const handleSave = async(e) => {
    e.preventDefault();
    if (formIncomplete()) return;
    if (id === null) {
      await dispatch(requestCreateNote({ userId, title, body, history }));
    } else {
      await dispatch(requestUpdateNote({ userId, id, title, body }));
    }
  }

  // facilitates a simple confirmation
  // flow when trying to delete a note
  let [ deleteStep, setDeleteStep ] = useState(0);
  const handleDelete = async(e) => {
    e.preventDefault();
    setDeleteStep(deleteStep = deleteStep + 1);
    if (deleteStep === 2) {
      await dispatch(requestDeleteNote({ userId, id, history }))
    }
  }

  return (
    <form>
      <label className="input-row">
        Title
        <input
          className="note_input-title"
          type="text"
          placeholder="Something short and descriptive"
          value={title}
          onChange={e => dispatch(setCurrentTitle(e.target.value))} />
      </label>
      <label className="input-row">
        Body
        <textarea
          className="note_input-body"
          value={body}
          ref={bodyRef}
          onChange={e => handleBodyInput(e)} />
      </label>
      <div className="form-actions">
        <button
          className={`btn btn-primary ${formIncomplete() ? 'disabled' : ''}`}
          onClick={e => handleSave(e)}>
          Save note
        </button>
        {
          id ? (
            <button
              className="btn btn-secondary"
              onClick={(e) => handleDelete(e)}>
              { deleteStep === 0 ? 'Delete this note' : 'Click to confirm'}
            </button>
          ) : null
        }
      </div>
    </form>
  );
}
