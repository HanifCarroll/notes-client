import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from "react-masonry-css";
import styles from "./styles.module.scss";
import { RootState } from 'src/redux/reducers';
import { Note } from '..';
import { NoteType, onEditNote, setNotes } from 'src/redux/notesSlice';
import { getNotesFromLocalStorage } from 'src/helper';

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
  let notesData = useSelector((state: RootState) => state.notes.notes);
  const localStorageNotes = useRef([]);
  useEffect(() => {
    const loadedNotes = getNotesFromLocalStorage();
    if (loadedNotes.length) {
      localStorageNotes.current = loadedNotes;
      dispatch(setNotes(localStorageNotes.current));
    }
  }, [])

  if (!notesData.length && !localStorageNotes.current.length) { return <NoNotes />}

  const onEdit = (note) =>
    dispatch(onEditNote({ ...note }));
  const onTitleEdit = (note) => () => dispatch(onEdit({ note: { ...note }, selectedField: 'title' }));
  const onContentEdit = (note) => () => dispatch(onEdit({ note: { ...note }, selectedField: 'content' }));
  const notes = notesData.map(note => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        onTitleClick={onTitleEdit(note)}
        onContentClick={onContentEdit(note)}
      />
    );
  });

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
