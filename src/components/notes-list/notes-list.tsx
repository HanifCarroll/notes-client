import React from 'react';
import { useSelector } from 'react-redux';
import Masonry from 'react-masonry-component';
import styles from "./styles.module.scss";
import { RootState } from 'src/redux/reducers';
import { Note } from '..';

const NoNotes = () => (
  <p className={styles.noNotes}>No notes!</p>
);

export const NotesList = () => {
  const notesData = useSelector((state: RootState) => state.notes.notes);
  if (!notesData.length) { return <NoNotes />}

  const notes = notesData.map(note => {
    return (
      <Note
        key={note.id}
        title={note.title}
        content={note.content}
      />
    )});

  return <Masonry>{notes}</Masonry>;
}
