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
  selectedNote: Note | null;
};

const initialState: NotesState = {
  notes: [],
  searchValue: '',
  filteredNotes: [],
  selectedNote: null,
};

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addNote(state, action: PayloadAction<Note>) {
      const { id, title, content } = action.payload;
      state.notes.push({ id, title, content });
    },
    saveNote(state, action: PayloadAction<Note>) {
      const { id, title, content } = action.payload;
      const noteToSave = state.notes.find(note => note.id === id);
      if (!noteToSave) { return; }

      noteToSave.title = title;
      noteToSave.content = content;
    },
    onSearchValueChange(state, action: PayloadAction<SearchValue>) {
      state.searchValue = action.payload.searchValue;
    },
    onDeleteNote(state, action: PayloadAction<DeleteNote>) {
      const { noteId } = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
    onCloseNote(state) {
      state.selectedNote = null;
    },
    onEditNote(state, action: PayloadAction<Note>) {
      state.selectedNote = action.payload;
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
