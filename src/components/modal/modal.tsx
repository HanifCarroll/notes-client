import React, { useCallback } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { saveNote } from 'src/redux/notesSlice';
import { EditNote } from '..';

export const EditNoteModal = props => {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);

  const onSave = useCallback(() => dispatch(saveNote({
    id: selectedNote.id,
    title: selectedNote.title,
    content: selectedNote.content,
  })), [dispatch, selectedNote.id, selectedNote.title, selectedNote.content]);

  return (
    <Modal
      showCloseIcon={false}
      animationDuration={300}
      classNames={{ modal: styles.modal, overlay: styles.overlay }}
      open={selectedNote.id}
      onClose={onSave}
      {...props}
    >
      <EditNote />
    </Modal>
  );
};

