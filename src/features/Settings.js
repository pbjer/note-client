import React from 'react';
import {
  useSelector,
  useDispatch
} from 'react-redux';
import {
  selectPagination,
  togglePagination,
  setLimit,
  selectLimit
} from './notes/noteSlice';
import './Settings.scss';

export const Settings = () => {
  const dispatch = useDispatch();

  const pagination = useSelector(selectPagination);
  const limit = useSelector(selectLimit);

  const handleRadioChange = (e) => {
    dispatch(setLimit(Number(e.target.value)));
  };

  return (
    <div>
      <h1
        className="settings-header">
        Settings
      </h1>
      <label className="page-toggle">
        <input
          type="checkbox"
          name="pages"
          checked={pagination}
          onChange={() => dispatch(togglePagination())} />
          View notes by page
      </label>
      {
        pagination ? (
          <div>
            <p className="num-pages-label">
              Notes per page
            </p>
            <label className="num-pages">
              <input
                type="radio"
                name="page-length"
                value={5}
                checked={limit === 5}
                onChange={(e) => handleRadioChange(e)} />
                5
            </label>
            <label className="num-pages">
              <input
                type="radio"
                name="page-length"
                value={10}
                checked={limit === 10}
                onChange={(e) => handleRadioChange(e)} />
                10
            </label>
            <label className="num-pages">
              <input
                type="radio"
                name="page-length"
                value={20}
                checked={limit === 20}
                onChange={(e) => handleRadioChange(e)} />
                20
            </label>
          </div>
        ) : null
      }
    </div>
  );
}
