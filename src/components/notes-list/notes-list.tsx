import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from "react-masonry-css";
import styles from "./styles.module.scss";
import { RootState } from 'src/redux/reducers';
import { Note } from '..';
import { onEditNote, setNotes } from 'src/redux/notesSlice';
import { getNotesFromLocalStorage, useSearch } from 'src/helper';

const breakpointColumns = {
  default: 4,
  1100: 3,
  700: 2,
  600: 1
};

const NoNotes = () => (
  <p className={styles.noNotes}>No notes!</p>
);

export const NotesList = () => {
  const dispatch = useDispatch();
  const allNotes = useSelector((state: RootState) => state.notes.notes);
  useEffect(() => {
    const loadedNotes = getNotesFromLocalStorage();
    if (!allNotes.length && loadedNotes.length) {
      dispatch(setNotes(loadedNotes));
    }
  }, [allNotes, dispatch])
  const searchValue = useSelector((state: RootState) => state.notes.searchValue);
  const filteredNotes = useSearch();

  if ((searchValue && !filteredNotes.length)
    || !allNotes.length) {
    return <NoNotes />;
  }

  const onEdit = (note) =>
    dispatch(onEditNote({ ...note }));
  const onTitleEdit = (note) => () => dispatch(onEdit({ note: { ...note }, selectedField: 'title' }));
  const onContentEdit = (note) => () => dispatch(onEdit({ note: { ...note }, selectedField: 'content' }));
  const createNote = (note) => (
    <Note
      key={note.id}
      id={note.id}
      title={note.title}
      content={note.content}
      onTitleClick={onTitleEdit(note)}
      onContentClick={onContentEdit(note)}
    />
  );
  const notes = searchValue ? filteredNotes.map(createNote) : allNotes.map(createNote);

  return (
    <Masonry
      breakpointCols={breakpointColumns}
      className={styles.grid}
      columnClassName=''
    >
    {notes}
  </Masonry>
  );
}
