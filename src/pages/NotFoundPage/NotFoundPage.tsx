import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom';

import notfoundImage from '../../assets/images/notfound.png';

import styles from './NotFoundPage.module.scss';

const NotfoundPage = (): ReactElement => {
  return (
    <section className={styles.notfound}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.mainContainer}>
            <img src={notfoundImage} alt="notfound" />
            <div className={styles.info}>
              <p className={styles.title}>Oops! Page not found.</p>
              <p className={styles.subtitle}>The page you were looking for doesn&#39;t exist</p>
              <p className={styles.advice}>
                You may have mistyped the address or the page may have moved
              </p>
              <Link to="/" className={styles.btnHome}>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotfoundPage;
