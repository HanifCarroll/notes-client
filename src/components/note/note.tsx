import React from "react";
import styles from './styles.module.scss';

export const Note = ({
                       title,
                       content,
                       onTitleClick = () => {},
                       onContentClick = () => {},
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.titleClassName} onClick={onTitleClick}>
        {title}
      </h3>

      <div className={styles.containerClassName} onClick={onContentClick}>
        <p className={styles.contentClassName}>{content}</p>
      </div>

      <div className={styles.buttonContainer}>
        <button>Delete</button>
        <button>Edit</button>
      </div>
    </div>
)
}
