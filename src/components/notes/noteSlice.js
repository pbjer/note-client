import { createSlice } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

export const noteSlice = createSlice({
  name: 'notes',
  initialState: {
    user: {
      loggedIn: false,
      userId: null,
    },
    currentNote: {
      id: null,
      title: '',
      body: '',
      created_at: null,
      updated_at: null
    },
    allNotes: []
  },
  reducers: {
    // Redux Toolkit uses Immer under the hood to provide
    // a 'mutation' like interface for updating state
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setCurrentNote: (state, action) => {
      state.currentNote = action.payload;
    },
    setCurrentTitle: (state, action) => {
      state.currentNote.title = action.payload;
    },
    setCurrentBody: (state, action) => {
      state.currentNote.body = action.payload;
    },
    setAllNotes: (state, action) => {
      state.allNotes = action.payload;
    },
  },
});

export const {
  setUser,
  setCurrentNote,
  setCurrentTitle,
  setCurrentBody,
  setAllNotes
} = noteSlice.actions;

// Thunks
export const requestCreateNote = (payload) => async(dispatch) => {
  const { userId, title, body, history } = payload;
  const requestBody = { title, body };
  try {
    const response = await axios.post(
      `/user/${userId}/note`,
      requestBody,
    );
    await dispatch(setCurrentNote(response.data));
    const { id } = response.data;
    history.push(`/note/${id}`);
  } catch(e) {
    console.log(e);
  }
}

export const requestGetNotes = (userId) => async(dispatch) => {
  try {
    const response = await axios.get(`/user/${userId}`);
    await dispatch(setAllNotes(response.data));
  } catch(e) {
    console.log(e);
  }
}

export const requestGetNoteById = (payload) => async(dispatch) => {
  const { userId, id } = payload;
  try {
    const response = await axios.get(`/user/${userId}/note/${id}`);
    await dispatch(await setCurrentNote(response.data));
  } catch(e) {
    console.log(e);
  }
}

export const requestUpdateNote = (payload) => async(dispatch) => {
  const { userId, id, title, body } = payload;
  const requestBody = { title, body };
  try {
    const response = await axios.put(
      `/user/${userId}/note/${id}`,
      requestBody,
    );
    await dispatch(setCurrentNote(response.data));
  } catch(e) {
    console.log(e);
  }
}

export const requestDeleteNote = (payload) => async(dispatch) => {
  const { userId, id, history } = payload;
  try {
    await axios.delete(`/user/${userId}/note/${id}`);
    await dispatch(clearCurrentNote());
    history.push('/notes');
  } catch(e) {
    console.log(e);
  }
}

export const clearCurrentNote = () => (dispatch) => {
  dispatch(setCurrentNote({
    id: null,
    title: '',
    body: '',
    created_at: null,
    deleted_at: null
  }));
}

// Selectors
export const selectUser = state => state.notes.user;
export const selectAllNotes = state => state.notes.allNotes;
export const selectCurrentNote = state => state.notes.currentNote;
export const selectCurrentTitle = state => state.notes.currentNote.title;
export const selectCurrentBody = state => state.notes.currentNote.title;

export default noteSlice.reducer;
