import React from 'react';
import styles from '/styles/Header.module.css';

const Header: React.FC = () => {


  return (
    <header className={styles.header}>
      <h1>TM</h1>
      <nav>
        <ul>
          <li><a href="#section1">Section 1</a></li>
          <li><a href="#section2">Section 2</a></li>
          <li><a href="#section3">Section 3</a></li>
          <li><a href="#section4">Section 4</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;