import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Header from '../components/Header';
import DataFetcher from '../components/DataFetcher';
import AccordionComponent from '../components/AccordionComponent';
import SwiperComponent from '../components/SwiperComponent';
import ContactForm from '../components/ContactForm';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GitHubIcon from '@mui/icons-material/GitHub';
import { useLanguage } from '../context/LanguageContext';
import styles from '/styles/Home.module.css';


const content = {
  en: {
    intro: "Hey I am Takashi Mio,\njunior web developer",
    brief: "Here is a brief introduction of my portfolio.",
    operator: "I am also the operator of Netrennen, an online platform. I have expertise in both frontend and backend development.",
    skills: "Skills",
    frontend: "Frontend:",
    backend: "Backend:",
    pythonTools: "Python Tools",
    pythonToolsIntro: "This table is automatically updated daily by scraping the Oricon (Japan's music ranking) daily singles chart.",
    pythonToolsSetup: "It is a simple setup using only the BeautifulSoup4 and Requests libraries. For tasks requiring browser operations such as logging in, I use Selenium or Pyppeteer.",
    pythonToolsAWS: "The data is fetched by a Python script running on AWS Lambda, which saves the results as a CSV file in S3 for display.",
    fullStack: "Full-Stack Web App",
    fullStackIntro: "This app is a handy tool for horse racing fans in Germany to help them with betting. It's been a fun project that combines a lot of different technologies and features to create a seamless experience.",
    fullStackDetail: "I've built a full-stack web app that handles everything from login authentication and database operations to API fetching, Stripe payments, and sending emails with SendGrid.",
    fullStackTech: "Tech Stack: Heroku, Vercel, S3, Docker, Next.js, DjangoRestFramework, PostgreSQL",
    contact: "Thanks for stopping by!\nCan't wait to hear from you.",
    contactNote: "Your message will be sent via AWS API Gateway to a Lambda backend using SES."
  },
  jp: {
    intro: "ジュニア・WEB開発者の\nTakashi Mioです",
    brief: "ポートフォリオをご覧いただきありがとうございます。",
    operator: "Netrennenというオンラインプラットフォームの運営者でもあります。フロントエンドとバックエンドの両方の開発に精通しています。",
    skills: "主なスキル:",
    frontend: "Frontend:",
    backend: "Backend:",
    pythonTools: "Pythonツール",
    pythonToolsIntro: "この表はオリコン・デイリーシングルチャートをスクレイピングして毎日自動更新されています。",
    pythonToolsSetup: "BeautifulSoup4とRequestsライブラリのみを使用したシンプルな設定です。ログインなどのブラウザ操作が必要な場合はSeleniumやPyppeteerを使用します。",
    pythonToolsAWS: "データはAWS Lambdaで実行されるPythonスクリプトによって取得され、S3にCSVファイルとして保存されて表示されます。",
    fullStack: "フルスタックWEBアプリ",
    fullStackIntro: "このアプリは、ドイツの競馬ファンが馬券購入の際のツールとして使ってくれています。多くの異なる技術と機能を組み合わせてシームレスな体験を提供する楽しいプロジェクトでした。",
    fullStackDetail: "ログイン認証、データベース操作、APIフェッチ、Stripe決済、SendGridを使ったメール送信など、全てを処理するフルスタックウェブアプリを構築しました。",
    fullStackTech: "技術スタック: Heroku、Vercel、S3、Docker、Next.js、DjangoRestFramework、PostgreSQL",
    contact: "最後までご覧頂きありがとうございました！\nメッセージをお待ちしています。",
    contactNote: "メッセージはAWS API Gatewayを経由してSESを使用したLambdaバックエンドに送信されます。"
  }
};


const Home: NextPage = () => {
  const { language } = useLanguage();

  const renderStatusIcon = (status: string) => {
    const iconClass = styles.rankIcon;

    switch (status) {
      case 'UP':
        return <TrendingUpIcon className={iconClass} style={{  color: '#C80036' }} />;
      case 'STAY':
        return <TrendingFlatIcon className={iconClass} style={{  color: '#379777' }} />;
      case 'DOWN':
        return <TrendingDownIcon className={iconClass} style={{  color: '#003285' }} />;
      case 'NEW':
        return <FiberNewIcon className={iconClass} style={{  color: '#DA7297' }} />;
      default:
        return <p style={{ fontSize: '2rem' }}>{status}</p>;
    }
  };

  const getClassNameForIndex = (index: number) => {
    return index < 9 ? 'singleDigit' : 'doubleDigit';
  };

  const formatTextWithBreaks = (text: string) => {
    return text.split('\n').map((line, index) => (
      <span key={index}>
        {line}
        <br />
      </span>
    ));
  };

  
  return (
    <div className={styles.container}>
      <Head>
        <title>Portfolio</title>
        <meta name="description" content="Portfolio Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className={styles.main}>
        <section id="section1" className={styles.section1}>
          <div className={styles.section1Content}>
            <div className={styles.textContainer}>
              <h1 className={styles.marginBottumA}>{formatTextWithBreaks(content[language].intro)}</h1>
              <div>
                <p className={styles.marginBottumA}>{content[language].brief}</p>
                <p>{content[language].operator}</p>
              </div>
              <div>
                <p className={styles.marginBottumA}>{content[language].skills}</p>
                <p>Frontend:</p>
                <p className={`${styles.marginBottumA} ${styles.skillRow}`}>
                  <Image src="/icons8-javascript-50.png" alt="js-logo" className={styles.jsLogo} width={50} height={50} />
                  <Image src="/icons8-typescript-50.png" alt="ts-logo" className={styles.jsLogo} width={50} height={50} />
                  <span>React (Next.js)</span>
                </p>
                <p>Backend:</p>
                <p className={styles.skillRow}>
                  <Image src="/icons8-python-26.png" alt="py-logo" className={styles.pyLogo} width={26} height={26} />
                  <span>Python (Django, Flask)</span>
                </p>
                <a href="https://github.com/Takashi1221/portfolio" target="_blank" rel="noopener noreferrer">
                <GitHubIcon 
                  sx={{
                    marginLeft: '-3px',
                    marginTop: '20px',
                    fontSize: '2.4rem',
                    color: '#000',
                    '&:hover': {
                      color: '#555',
                    },
                    '@media (max-width: 600px)': {
                      fontSize: '2rem',
                      marginBottom: '10px',
                    },
                  }}
                />
              </a>
              </div>
            </div>
            <div className={styles.imageContainer}>
              <Image src="/portfolioimage.png" alt="Portfolio" width={600} height={600} />
            </div>
          </div>
        </section>
        <section id="section2" className={styles.section2}>
          <div className={styles.section2Content}>
            <div className={styles.section2LeftContainer}>
              <Image src="/aboutme.png" alt="Aboutme" width={500} height={500} className={styles.aboutImage}/>
            </div>
            <div className={styles.section2RightContainer}>
              <AccordionComponent />
            </div>
          </div>
        </section>
        <section id="section3" className={styles.section3}>
          <div className={styles.section3Content}>
            <div className={styles.textContainer}>
              <h1>Python Tools</h1>
              <p>{content[language].pythonToolsIntro}</p>
              <p>{content[language].pythonToolsSetup}</p>
              <p>{content[language].pythonToolsAWS}</p>
              <a href="https://github.com/Takashi1221/sample-scrape/blob/main/scrape.py" target="_blank" rel="noopener noreferrer">
                <GitHubIcon 
                  sx={{
                    fontSize: '2.8rem',
                    color: '#000',
                    '&:hover': {
                      color: '#555',
                    },
                    '@media (max-width: 600px)': {
                      fontSize: '2rem',
                      marginBottom: '10px',
                    },
                  }}
                />
              </a>
            </div>
            <div className={styles.scrapeTool}>
              <DataFetcher>
                {(data, source) => (
                  <div className={styles.rankBox}>
                    <h3>Daily Single Chart ({source})</h3>
                        {data.map((row, index) => (
                        <div  key={index} className={styles.rankContainer}>
                          <div className={styles.rankLeft}>
                            <p className={styles[getClassNameForIndex(index)]}>{index+1}</p>
                            <p>{renderStatusIcon(row.Status)}</p>
                          </div>
                          <div className={styles.rankRight}>
                            <p className={styles.rankTitle}>{row.Title}</p>
                            <p className={styles.rankName}>{row.Name}</p>
                          </div>
                        </div>
                        ))}
                  </div>
                )}
              </DataFetcher>
            </div>
          </div>
        </section>
        <section id="section4" className={styles.section4}>
          <div className={styles.section4Content}>
            <div className={styles.section4LeftContainer}>
              <h1>Full-Stack Web App</h1>
              <p>{content[language].fullStackIntro}</p>
              <p>{content[language].fullStackDetail}</p>
              <p>{content[language].fullStackTech}</p>
              <a href="https://github.com/Takashi1221/Frontend-NETRENNEN" target="_blank" rel="noopener noreferrer">
                <GitHubIcon 
                  sx={{
                    fontSize: '2.8rem',
                    color: '#fff',
                    '&:hover': {
                      color: '#555',
                    },
                    '@media (max-width: 600px)': {
                      fontSize: '2rem',
                      marginBottom: '10px',
                    },
                  }}
                />
              </a>
            </div>
            <div className={styles.section4RightContainer}><SwiperComponent /></div>
          </div>
        </section>
        <section id="section5" className={styles.sectionContact}>
          <span className={styles.contactHead}>{formatTextWithBreaks(content[language].contact)}</span>
          <ContactForm />
          <p>{content[language].contactNote}</p>
        </section>
      </main>
    </div>
  );
};

export default Home;
