import React, { useCallback, useEffect, useRef, useState } from 'react';
import TextareaAutosize from "react-autosize-textarea";
import styles from './styles.module.scss';

export const NewNote = () => {
  const containerElement = useRef(null);
  const [ isNewNote, setIsNewNote ] = useState(false);
  const [ title, setTitle ] = useState('');
  const [ content, setContent ] = useState('');

  const handleTextAreaClick = () => setIsNewNote(true);

  const handleClickOutside = useCallback((e) => {
    if (containerElement.current.contains(e.target)) {
      return;
    }

    // If there's no title and no content, then close the form.
    if (!title && !content) { setIsNewNote(false); }

    // Otherwise, save the note.
    if (title || content) { saveNote(); }
  }, [title, content]);

  const saveNote = () => {
    alert('Note saved');
    setTitle('');
    setContent('')
    setIsNewNote(false);
  }

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
                style={{ borderRadius: isNewNote ? null : "4px" }}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onClick={handleTextAreaClick}
                placeholder="Write a note..."
            />
          </div>
        </div>
      </div>
  );
}
