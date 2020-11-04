import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import styles from '../edite-note/styles.module.scss';
import TextareaAutosize from 'react-autosize-textarea';
import { onSelectedNoteEdit } from 'src/redux/notesSlice';

export const EditNote = () => {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);
  const selectedField = useSelector((state: RootState) => state.notes.selectedField);
  const titleInput = useRef<HTMLInputElement>(null);
  const contentInput = useRef<HTMLTextAreaElement>(null);
  const onTitleChange = (e) => dispatch(onSelectedNoteEdit({
    field: 'title',
    value: e.target.value,
  }));
  const onContentChange = (e) => dispatch(onSelectedNoteEdit({
    field: 'content',
    value: e.target.value,
  }));

  // Focus the input that was clicked on on mount.
  useEffect(() => {
    if (selectedField === 'title' && titleInput.current) {
      titleInput.current.focus();
    }

    if (selectedField === 'content' && contentInput.current) {
      const length = contentInput.current.textLength;
      contentInput.current.focus();
      contentInput.current.setSelectionRange(length, length);
    }
  }, [selectedField, titleInput, contentInput]);

  return (
    <>
      <input
        ref={titleInput}
        className={styles.titleInput}
        placeholder="Title"
        value={selectedNote.title}
        onChange={onTitleChange}
      />
      <TextareaAutosize
        ref={contentInput}
        className={styles.contentInput}
        value={selectedNote.content}
        onChange={onContentChange}
        placeholder="Write a note..."
      />
    </>
  );
};
