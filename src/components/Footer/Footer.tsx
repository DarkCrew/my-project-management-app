import React, { ReactElement } from 'react';

import githubImage from '../../assets/images/github.png';
import rssImage from '../../assets/images/rs-school.png';

import styles from './Footer.module.scss';

const Footer = (): ReactElement => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.rssContainer}>
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img src={rssImage} alt="rss-logo" />
            </a>
          </div>
          <p>© 2022</p>

          <div className={styles.contact}>
            <a href="https://github.com/NikolayKovzik" target="_blank" rel="noreferrer">
              <img src={githubImage} alt="contact-nikolay" />
              <p>Nikolay Kovzik</p>
            </a>
          </div>
          <div className={styles.contact}>
            <a href="https://github.com/DarkCrew" target="_blank" rel="noreferrer">
              <img src={githubImage} alt="contact-nikolay" />
              <p>Kirill Kovalev</p>
            </a>
          </div>
          <div className={styles.contact}>
            <a href="https://github.com/ishah148" target="_blank" rel="noreferrer">
              <img src={githubImage} alt="contact-nikolay" />
              <p>Igor Shah</p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
