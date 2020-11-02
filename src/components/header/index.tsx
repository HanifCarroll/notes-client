import React from "react";
import styles from "./styles.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { onSearchValueChange } from 'src/redux/notesSlice';

export const Header = () => {
  const dispatch = useDispatch();
  const searchValue = useSelector((state: RootState) => state.notes.searchValue);
  const onSearchChange = (e) => dispatch(onSearchValueChange({ searchValue: e.target.value }));

  return (
      <header className={styles.header}>
        <h1 className={styles.logo}>Notes</h1>
        <input
            className={styles.search}
            type="search"
            placeholder="Search notes..."
            value={searchValue}
            onChange={onSearchChange}
        />
      </header>
  );
};
