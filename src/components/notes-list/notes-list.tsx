import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Masonry from 'react-masonry-component';
import styles from "./styles.module.scss";
import { RootState } from 'src/redux/reducers';
import { Note } from '..';
import { onEditNote } from 'src/redux/notesSlice';

const NoNotes = () => (
  <p className={styles.noNotes}>No notes!</p>
);

export const NotesList = () => {
  const dispatch = useDispatch();
  const notesData = useSelector((state: RootState) => state.notes.notes);
  if (!notesData.length) { return <NoNotes />}

  const onEdit = (noteId, selectedField) =>
    dispatch(onEditNote({ noteId, selectedField }));
  const notes = notesData.map(note => {
    return (
      <Note
        key={note.id}
        id={note.id}
        title={note.title}
        content={note.content}
        onTitleClick={() => onEdit(note.id, 'title')}
        onContentClick={() => onEdit(note.id, 'content')}
      />
    );
  });

  return <Masonry>{notes}</Masonry>;
}
