import React, { useCallback } from "react";
import { Modal } from "react-responsive-modal";
import 'react-responsive-modal/styles.css';
import styles from './styles.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { onCloseNote } from 'src/redux/notesSlice';
import { EditNote } from '..';

export const ResponsiveModal = props => {
  const dispatch = useDispatch();
  const selectedNote = useSelector((state: RootState) => state.notes.selectedNote);

  const onClose = useCallback(() => dispatch(onCloseNote()), []);

  return (
    <Modal
      showCloseIcon={false}
      animationDuration={300}
      classNames={{ modal: styles.modal, overlay: styles.overlay }}
      open={selectedNote}
      onClose={onClose}
      {...props}
    >
      <EditNote />
    </Modal>
  );
};

