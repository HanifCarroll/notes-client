import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  content: string;
};

type NotesState = {
  notes: Note[];
};

const initialState: NotesState = {
  notes: []
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const { id, title, content } = action.payload;
      state.notes.push({ id, title, content });
    }
  }
});

export const { addNote } = notesSlice.actions;

export default notesSlice.reducer;
