import React, { useState } from "react";
import styles from "./styles.module.scss";

export const Header = () => {
  const [searchValue, setSearchValue ] = useState('');
  return (
      <header className={styles.header}>
        <h1 className={styles.logo}>Notes</h1>
        <input
            className={styles.search}
            type="search"
            placeholder="Search notes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
        />
      </header>
  );
};
