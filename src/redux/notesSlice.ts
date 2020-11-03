import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Note = {
  id: string;
  title: string;
  content: string;
};

type SearchValue = {
  searchValue: string;
};

type DeleteNote = {
  noteId: string;
};

type EditNote = {
  noteId: string;
  selectedField: string;
}

type NotesState = {
  notes: Note[];
  searchValue: string;
  filteredNotes: Note[];
  selectedNoteId: string;
};

const initialState: NotesState = {
  notes: [],
  searchValue: '',
  filteredNotes: [],
  selectedNoteId: '',
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
    onDeleteNote(state, action: PayloadAction<DeleteNote>) {
      const { noteId } = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
    onCloseNote(state) {
      state.selectedNoteId = '';
    },
    onEditNote(state, action: PayloadAction<EditNote>) {
      state.selectedNoteId = action.payload.noteId;
    },
  },
});

export const {
  addNote,
  onSearchValueChange,
  onDeleteNote,
  onCloseNote,
  onEditNote,
} = notesSlice.actions;

export default notesSlice.reducer;
