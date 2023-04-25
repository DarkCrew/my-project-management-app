import React, { ReactElement } from 'react';

import styles from './Loader.module.scss';

const Loader = (): ReactElement => {
  return (
    <div className={styles.ldsRoller}>
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
