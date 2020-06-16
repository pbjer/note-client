import React, { useEffect, useCallback } from 'react';
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
  const { userId } = useSelector(selectUser);
  const id = params.id ? params.id : null;
  const { title, body } = useSelector(selectCurrentNote);

  const bodyRef = useCallback(node => {
    if(node!== null) {
      resizeTextArea(node);
    }
    // eslint-disable-next-line
  }, [ body ]);

  useEffect(() => {
    if (id !== null) {
      dispatch(requestGetNoteById({ id, userId }));
    }
    return () => {
      dispatch(clearCurrentNote());
    }
    // eslint-disable-next-line
  },[id, dispatch]);

  const handleBodyInput = (e) => {
    dispatch(setCurrentBody(e.target.value));
    resizeTextArea(e.target);
  }

  const resizeTextArea = (ref) => {
    ref.style.height = 'inherit';
    ref.style.height = `${ref.scrollHeight + 10}px`;
  }

  const handleSave = async(e) => {
    e.preventDefault();
    if (id === null) {
      await dispatch(requestCreateNote({ userId, title, body, history }));
    } else {
      await dispatch(requestUpdateNote({ userId, id, title, body }));
    }
  }

  const handleDelete = async(e) => {
    e.preventDefault();
    await dispatch(requestDeleteNote({ userId, id, history }))
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
          className="btn btn-primary"
          onClick={e => handleSave(e)}>
          Save note
        </button>
        <button
          className="btn btn-secondary"
          onClick={(e) => handleDelete(e)}>
          Delete this note
        </button>
      </div>
    </form>
  );
}
