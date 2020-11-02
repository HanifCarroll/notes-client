import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  content: string;
};

type SearchValue = {
  searchValue: string;
};

type NotesState = {
  notes: Note[];
  searchValue: string;
  filteredNotes: Note[];
};

const initialState: NotesState = {
  notes: [],
  searchValue: '',
  filteredNotes: [],
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const { id, title, content } = action.payload;
      state.notes.push({ id, title, content });
    },
    onSearchValueChange(state, action: PayloadAction<SearchValue>) {
      state.searchValue = action.payload.searchValue;
    },
  }
});

export const { addNote, onSearchValueChange } = notesSlice.actions;

export default notesSlice.reducer;
