import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styles from '../edite-note/styles.module.scss';
import TextareaAutosize from 'react-autosize-textarea';
import { onSelectedNoteEdit } from 'src/redux/notesSlice';

export const EditNote = () => {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);
  const containerElement = useRef<HTMLDivElement>(null);
  const onTitleChange = (e) => dispatch(onSelectedNoteEdit({
    field: 'title',
    value: e.target.value,
  }));
  const onContentChange = (e) => dispatch(onSelectedNoteEdit({
    field: 'content',
    value: e.target.value,
  }));

  return (
    <>
      <input
        className={styles.titleInput}
        placeholder="Title"
        value={selectedNote.title}
        onChange={onTitleChange}
      />
      <TextareaAutosize
        className={styles.contentInput}
        value={selectedNote.content}
        onChange={onContentChange}
        placeholder="Write a note..."
      />
    </>
  );
};
