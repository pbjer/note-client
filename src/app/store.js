import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../components/notes/noteSlice';

export default configureStore({
  reducer: {
    notes: noteReducer,
  },
});
