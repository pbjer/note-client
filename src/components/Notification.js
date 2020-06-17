import React from 'react';
import { useSelector } from 'react-redux';
import {
  selectNotificationStatus,
  selectNotificationMsg
} from './notes/noteSlice';
import './Notification.scss';

export const Notification = () => {
  const active = useSelector(selectNotificationStatus);
  const { type, message } = useSelector(selectNotificationMsg)
  if (active) {
    return (
      <div className={`notification ${type}`}>
        { message }
      </div>
    );
  } return null;
}
