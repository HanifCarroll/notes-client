import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TextareaAutosize from "react-autosize-textarea";
import { addNote } from '../../redux/notesSlice';
import styles from './styles.module.scss';
import { RootState } from '../../redux/reducers';


const NewNote = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes);

  const containerElement = useRef<HTMLDivElement>(null);
  const [ isNewNote, setIsNewNote ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const saveNote = useCallback(() => {
    dispatch(addNote({ id: '1', title, content }));
    alert('Note saved: ' + title + ' ' + content);
    setTitle('');
    setContent('')
    setIsNewNote(false);
  }, [dispatch, content, title]);

  const handleTextAreaClick = () => setIsNewNote(true);

  const handleClickOutside = useCallback((e) => {
    if (containerElement.current && containerElement.current.contains(e.target)) {
      return;
    }

    // If there's no title and no content, then close the form.
    if (!title && !content) { setIsNewNote(false); }

    // Otherwise, save the note.
    if (title || content) { saveNote(); }
  }, [title, content, saveNote]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [handleClickOutside]);

  return (
      <div ref={containerElement} className={styles.container}>
        <div className={styles.wrapper}>
          <div>
            <input
                style={{ display: isNewNote ? "block" : "none" }}
                className={styles.titleInput}
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <TextareaAutosize
                className={styles.contentInput}
                style={{ borderRadius: isNewNote ? undefined : "4px" }}
                value={content}
                onChange={(e) => setContent(e.currentTarget.value)}
                onClick={handleTextAreaClick}
                placeholder="Write a note..."
            />
          </div>
        </div>
      </div>
  );
}

export default NewNote;
