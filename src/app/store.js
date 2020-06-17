import { configureStore } from '@reduxjs/toolkit';
import noteReducer from '../features/notes/noteSlice';

export default configureStore({
  reducer: {
    notes: noteReducer,
  },
});
