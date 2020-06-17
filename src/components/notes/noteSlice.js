import { createSlice } from '@reduxjs/toolkit';
import axios from '../../lib/axios';
import { paramBuilder } from '../../utils/paramBuilder';

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
    allNotes: [],
    sortAscending: false,
    pagination: false,
    limit: null,
    start: 0,
    totalResults: 0,
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
    // note list options
    toggleSortAscending: (state) => {
      state.sortAscending = !state.sortAscending;
    },
    togglePagination: (state, action) => {
      state.pagination = !state.pagination;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setStart: (state, action) => {
      state.start = action.payload;
    },
    setTotalResults: (state, action) => {
      state.totalResults = action.payload;
    }
  },
});

export const {
  setUser,
  setCurrentNote,
  setCurrentTitle,
  setCurrentBody,
  setAllNotes,
  setPages,
  setLimit,
  setStart,
  toggleSortAscending,
  togglePagination,
  setTotalResults,
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

export const requestGetNotes = (payload) => async(dispatch) => {
  const { userId, sort, pagination, limit, start } = payload;
  let options = [];
  if (sort) {
    options.push('order=asc');
  }
  if (pagination) {
    options.push(`limit=${limit}`);
    options.push(`start=${start}`);
  }
  const params = paramBuilder(options);
  try {
    const response = await axios.get(`/user/${userId}${params}`);
    await dispatch(setAllNotes(response.data));
    if (response.data.length > 0) {
      await dispatch(setTotalResults(Number(response.data[0].full_count)));
    }
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
export const selectSortAscending = state => state.notes.sortAscending;
export const selectPagination = state => state.notes.pagination;
export const selectLimit = state => state.notes.limit;
export const selectStart = state => state.notes.start;
export const selectTotalResults = state => state.notes.totalResults;

export default noteSlice.reducer;
