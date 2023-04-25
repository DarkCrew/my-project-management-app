import React, { ReactElement, useEffect } from 'react';
import { User } from 'core/api/models';
import UsersApi from 'core/api/UsersApi';
import { useAppDispatch, useAppSelector } from 'store';

import mainImage from '../../assets/images/kanaban.png';
import kirillImage from '../../assets/images/kirill.png';
import nikolayImage from '../../assets/images/nikolay.png';
import igorImage from '../../assets/images/shah.png';

import styles from './HomePage.module.scss';

const HomePage = (): ReactElement => {
  const todos = useAppSelector((state) => state.todos.list);
  const dispatch = useAppDispatch();

  const getUsers = async (): Promise<void> => {
    const usersInfo: User[] = await (await UsersApi.getUsers()).data;
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className={styles.home}>
      <div className="container">
        <div className={styles.container}>
          <div className={styles.mainContainer}>
            <div className={styles.info}>
              <div className={styles.titleContainer}>
                <p className={styles.title}>Project Management System</p>
                <p>
                  If you want to find a convenient application in which it will be convenient to set
                  and complete tasks
                </p>
                <p>Then we are ready to present to your attention our application PMA</p>
                <p>
                  With this application, you can easily manage your project, be aware of all tasks
                  and control the progress of their implementation
                </p>
              </div>

              <div className={styles.imageContainer}>
                <img className={styles.mainImage} src={mainImage} alt="home-kanban" />
              </div>
            </div>
            <div>
              <button className={styles.startBtn} type="button">
                Get started
              </button>
            </div>
          </div>
          <div className={styles.aboutUs}>
            <p>About us</p>
            <div className={styles.developers}>
              <a
                className={styles.developer}
                href="https://github.com/DarkCrew"
                target="_blank"
                rel="noreferrer"
              >
                <p className={styles.developerTitle}>Kirill</p>
                <div className={styles.developerImage}>
                  <img src={kirillImage} alt="developerPhoto" />
                </div>
                <p className={styles.developerSubtitle}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry standard dummy text ever since the 1500s
                </p>
              </a>
              <a
                className={styles.developer}
                href="https://github.com/ishah148"
                target="_blank"
                rel="noreferrer"
              >
                <p className={styles.developerTitle}>Igor</p>
                <div className={styles.developerImage}>
                  <img src={igorImage} alt="developerPhoto" />
                </div>
                <p className={styles.developerSubtitle}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry standard dummy text ever since the 1500s
                </p>
              </a>
              <a
                className={styles.developer}
                href="https://github.com/NikolayKovzik"
                target="_blank"
                rel="noreferrer"
              >
                <p className={styles.developerTitle}>Nikolay</p>
                <div className={styles.developerImage}>
                  <img src={nikolayImage} alt="developerPhoto" />
                </div>
                <p className={styles.developerSubtitle}>
                  Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                  Ipsum has been the industry standard dummy text ever since the 1500s
                </p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
