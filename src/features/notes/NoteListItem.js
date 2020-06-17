import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import './NoteListItem.scss';

export const NoteListItem = (props) => {
  const { note } = props;
  return (
    <li>
      <Link
        to={`/note/${note.id}`}
        className="note-list-item">
        <div className="left">
          <p className="title">
            { note.title }
          </p>
        </div>
        <div className="right">
          <div className="date-info">
            <p className="created">
              Created { moment(note.created_at).calendar().toLowerCase() }
            </p>
            <p className="updated">
              last updated { moment(note.updated_at).fromNow()}
            </p>
          </div>
        </div>
      </Link>
    </li>
  );
}
