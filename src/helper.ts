import Fuse from 'fuse.js';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './redux/reducers';
import { NoteType } from './redux/notesSlice';

export function getNotesFromLocalStorage() {
  try {
    const item = window.localStorage.getItem('notes-react');

    return item ? JSON.parse(item) : [];

  } catch (error) {
    console.log('error:', error);
    return [];
  }
}

export function useSearch() {
  const notesData = useSelector((state: RootState) => state.notes.notes);
  const fuseSearch = useMemo(() => getSearchableEntities(notesData), [notesData]);
  const searchValue = useSelector((state: RootState) => state.notes.searchValue);
  return fuseSearch.search(searchValue).map(result => result.item) as NoteType[];
}

function getSearchableEntities(notes) {
  const options = {
    findAllMatches: false,
    keys: ["title", "content"],
    matchAllTokens: true,
    tokenize: true,
  };

  return new Fuse(notes, options);
}
