import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useLanguage } from '../context/LanguageContext';
import styles from '/styles/Accordion.module.css';

const AccordionComponent: React.FC = () => {
  const { language } = useLanguage();
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const accordionStyles = {
    '& .MuiAccordionSummary-root': {
        backgroundColor: '#ffffff', 
        '& .MuiTypography-root': {
        fontSize: '1.2rem',
        },
    },
    '& .MuiAccordionDetails-root': {
        backgroundColor: '#ffffff', 
        p: 2,
        '& .MuiTypography-root': {
        fontSize: '1.2rem', 
        },
    },
  };

  const content = {
    en: {
      title: "About me",
      panel1: {
        summary: "Why did you decide to become a web developer?",
        details: "Honestly, I never really aimed to become a web developer. I wanted a web app for horse racing data and couldn't afford to pay someone to make it, so I built it myself. That's how I ended up with web development skills."
      },
      panel2: {
        summary: "What's your web development experience?",
        details: "As mentioned, I started with personal projects. I began in March 2024 and completed my web app by May 2024. So, my web development journey started in March 2024."
      },
      panel3: {
        summary: "What challenges have you faced in development?",
        details: "Programming itself wasn't too challenging since I could figure out the logic and get help from GPT. However, setting up the infrastructure was really tough."
      },
      panel4: {
        summary: "What development skills do you want to learn in the future?",
        details: "I'm enjoying web development right now, but in the future, I'd like to learn Go. I'm also interested in exploring Flutter for mobile app development."
      },
      panel5: {
        summary: "What kind of engineer do you want to be in 10 years?",
        details: "Honestly, I don't aim to be a full-time engineer. I prefer to stay in a position where I can offer my web development skills if there's a need for them."
      }
    },
    jp: {
      title: "簡単な自己紹介",
      panel1: {
        summary: "なぜWEB開発者になろうと思ったの？",
        details: "実のところWEB開発者になりたいと思ったことはありません。自分で競馬新聞のWEBアプリが欲しいと思って、お金がないから自分で作った結果、WEB開発ができる状態になった。というところです。"
      },
      panel2: {
        summary: "WEB開発歴は？",
        details: "上述のとおり個人開発から始めたわけですが、それが2024年3月にスタートして5月に完成しました。つまりWEB開発は2024年3月からです。"
      },
      panel3: {
        summary: "開発で苦労したことは？",
        details: "プログラミング自体は自分でロジックが定まっていればGPTに教えてもらうこともできるので大きな苦労ではなかったですが、インフラ周りのセッティングが本当に苦労しました。"
      },
      panel4: {
        summary: "今後身につけたい開発スキルは？",
        details: "以上のような経緯でWEB開発を楽しんでいる現状ですが、今後勉強してみたいのはGO言語です。モバイルアプリ開発用にFlutterも勉強してみたいとも思っています。"
      },
      panel5: {
        summary: "10年後どんなエンジニアになっていたい？",
        details: "正直なところエンジニアになりたいというよりも、もしニーズがあるならWEB開発のスキルを提供できます。くらいのスタンスでいたいです。"
      }
    }
  };

  return (
    <div className={styles.accordionContainer}>
      <h2>{content[language].title}</h2>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>{content[language].panel1.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content[language].panel1.details}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography>{content[language].panel2.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content[language].panel2.details}
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography>{content[language].panel3.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content[language].panel3.details}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography>{content[language].panel4.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content[language].panel4.details}
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel5'}
        onChange={handleChange('panel5')}
        sx={accordionStyles}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel5a-content"
          id="panel5a-header"
        >
          <Typography>{content[language].panel5.summary}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content[language].panel5.details}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;