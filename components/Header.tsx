import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import styles from '/styles/Header.module.css';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const [alignment, setAlignment] = React.useState<string | null>(language);

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
  ) => {
    setAlignment(newAlignment);
    if (newAlignment) {
      setLanguage(newAlignment as 'en' | 'jp');
      setAlignment(newAlignment);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.myToggle}>
        <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="language selection"
            className={styles.toggleGroup}
          >
            <ToggleButton value="en" aria-label="English" className={styles.toggleButton}>
              English
            </ToggleButton>
            <ToggleButton value="jp" aria-label="日本語" className={styles.toggleButton}>
              日本語
            </ToggleButton>
          </ToggleButtonGroup>
      </div>
    </header>
  );
};

export default Header;