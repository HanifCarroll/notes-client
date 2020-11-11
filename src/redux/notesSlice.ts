import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type NoteType = {
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
  note: NoteType;
  selectedField: string;
};

type NoteEdit = {
  field: string;
  value: string;
}

type NotesState = {
  notes: NoteType[];
  searchValue: string;
  filteredNotes: NoteType[];
  selectedNote: NoteType;
  selectedField: string;
};

const defaultNote: NoteType = { id: '', title: '', content: '' };
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
    addNote(state, action: PayloadAction<NoteType>) {
      const { id, title, content } = action.payload;
      state.notes.push({ id, title, content });
      window.localStorage.setItem('notes-react', JSON.stringify(state.notes));
    },
    saveNote(state, action: PayloadAction<NoteType>) {
      const { id, title, content } = action.payload;
      const noteToSave = state.notes.find(note => note.id === id);
      if (!noteToSave) { return; }

      noteToSave.title = title;
      noteToSave.content = content;
      state.selectedNote = { ...defaultNote };
      state.selectedField = '';
      window.localStorage.setItem('notes-react', JSON.stringify(state.notes));
    },
    setNotes(state, action: PayloadAction<NoteType[]>) {
      state.notes = action.payload;
    },
    onSearchValueChange(state, action: PayloadAction<SearchValue>) {
      state.searchValue = action.payload.searchValue;
    },
    onDeleteNote(state, action: PayloadAction<DeleteNote>) {
      const { noteId } = action.payload;
      state.notes = state.notes.filter(note => note.id !== noteId);
      window.localStorage.setItem('notes-react', JSON.stringify(state.notes));
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
  setNotes,
  onSearchValueChange,
  onDeleteNote,
  onEditNote,
  onSelectedNoteEdit,
} = notesSlice.actions;

export default notesSlice.reducer;
