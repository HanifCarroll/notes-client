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
  note: Note;
  selectedField: string;
};

type NoteEdit = {
  field: string;
  value: string;
}

type NotesState = {
  notes: Note[];
  searchValue: string;
  filteredNotes: Note[];
  selectedNote: Note;
  selectedField: string;
};

const defaultNote: Note = { id: '', title: '', content: '' };
const initialState: NotesState = {
  notes: [],
  searchValue: '',
  filteredNotes: [],
  selectedNote: { ...defaultNote },
  selectedField: '',
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
      state.selectedNote = { ...defaultNote };
      state.selectedField = '';
    },
    onSearchValueChange(state, action: PayloadAction<SearchValue>) {
      state.searchValue = action.payload.searchValue;
    },
    onDeleteNote(state, action: PayloadAction<DeleteNote>) {
      const { noteId } = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
    },
    onEditNote(state, action: PayloadAction<EditNote>) {
      state.selectedNote = action.payload.note;
      state.selectedField = action.payload.selectedField;
    },
    onSelectedNoteEdit(state, action: PayloadAction<NoteEdit>) {
      if (action.payload.field === 'title') {
        state.selectedNote.title = action.payload.value;
      }
      if (action.payload.field === 'content') {
        state.selectedNote.content = action.payload.value;
      }
    },
  },
});

export const {
  addNote,
  saveNote,
  onSearchValueChange,
  onDeleteNote,
  onEditNote,
  onSelectedNoteEdit,
} = notesSlice.actions;

export default notesSlice.reducer;
