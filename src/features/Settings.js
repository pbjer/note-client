import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectPagination,
  togglePagination,
  setLimit,
  selectLimit
} from './notes/noteSlice';
import './Settings.scss';

export const Settings = () => {
  const dispatch = useDispatch();

  const limit = useSelector(selectLimit);
  const handleRadioChange = (e) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  const pagination = useSelector(selectPagination);
  const handleTogglePagination = () => {
    dispatch(togglePagination());
  };

  return (
    <div>
      <h1
        className="settings-header">
        Settings
      </h1>
      <label className={`page-toggle ${pagination ? 'active-label' : ''}`}>
        <input
          type="checkbox"
          name="pages"
          checked={pagination}
          onChange={() => handleTogglePagination()} />
          View notes by page
      </label>
      {
        pagination ? (
          <div class="radio-wrapper">
            <p className="num-pages-label">
              Notes per page
            </p>
            <label className={`num-pages ${limit === 5 ? 'active-label' : ''}`}>
              <input
                type="radio"
                name="page-length"
                value={5}
                checked={limit === 5}
                onChange={(e) => handleRadioChange(e)} />
                <span>5</span>
            </label>
            <label className={`num-pages ${limit === 10 ? 'active-label' : ''}`}>
              <input
                type="radio"
                name="page-length"
                value={10}
                checked={limit === 10}
                onChange={(e) => handleRadioChange(e)} />
                <span>10</span>
            </label>
            <label className={`num-pages ${limit === 20 ? 'active-label' : ''}`}>
              <input
                type="radio"
                name="page-length"
                value={20}
                checked={limit === 20}
                onChange={(e) => handleRadioChange(e)} />
                <span>20</span>
            </label>
          </div>
        ) : null
      }
      <div>
        <Link
          className="btn btn-primary done"
          to="/notes">
          Done
        </Link>
      </div>
    </div>
  );
}
