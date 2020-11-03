import React from "react";
import { useDispatch } from 'react-redux';
import styles from './styles.module.scss';
import { onDeleteNote, onEditNote } from 'src/redux/notesSlice';
import { DeleteButton } from '..';

export const Note = ({
                       id,
                       title,
                       content,
                       onTitleClick,
                       onContentClick,
}) => {
  const dispatch = useDispatch();
  const editNote = () => dispatch(onEditNote({
    id,
    title,
    content,
  }));
  const deleteNote = () => dispatch(onDeleteNote({ noteId: id }));

  return (
    <div className={styles.container}>
      <h3 className={styles.noteTitle} onClick={onTitleClick}>
        {title}
      </h3>

      <div className={styles.noteContentContainer} onClick={onContentClick}>
        <p className={styles.noteContent}>{content}</p>
      </div>

      <div className={styles.buttonContainer}>
        <DeleteButton deleteNote={deleteNote}/>
        <button onClick={editNote}>Edit</button>
      </div>
    </div>
)
}
