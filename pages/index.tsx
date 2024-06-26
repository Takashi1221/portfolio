import { NextPage } from 'next';
import Image from 'next/image';
import Head from 'next/head';
import Header from '../components/Header';
import DataFetcher from '../components/DataFetcher';
import styles from '/styles/Home.module.css';

const Home: NextPage = () => {

  
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
          <div className={styles['section1-content']}>
            <div className={styles['text-container']}>
              <h1 className={styles.marginBottumA}>Hey I am Takashi Mio, junior web developer</h1>
              <div>
                <p className={styles.marginBottumA}>Here is a brief introduction of my portfolio.</p>
                <p>I am also the operator of Netrennen, an online platform. I have expertise in both frontend and backend development.</p>
              </div>
              <div>
                <p className={styles.marginBottumA}>Skills</p>
                <p>Frontend:</p>
                <p className={`${styles.marginBottumA} ${styles.skillRow}`}>
                  <Image src="/icons8-javascript-50.png" alt="js-logo" className={styles.jsLogo} width={50} height={50} />
                  <span>React (Next.js)</span>
                </p>
                <p>Backend:</p>
                <p className={styles.skillRow}>
                  <Image src="/icons8-python-26.png" alt="py-logo" className={styles.pyLogo} width={26} height={26} />
                  <span>Python (Django, Flask)</span>
                </p>
              </div>
            </div>
            <div className={styles['image-container']}>
              <Image src="/portfolioimage.png" alt="Portfolio" width={600} height={600} />
            </div>
          </div>
        </section>
        <section id="section2" className={styles.section}>
          <h2>Section 2</h2>
        </section>
        <section id="section3" className={styles.section3}>
          <div className={styles['section3-content']}>
            <div className={styles['text-container']}>
              <h1>Python Tools</h1>
              <p>This table is automatically updated daily by scraping the Oricon (Japan&apos;s music ranking) daily singles chart.</p>
              <p>It is a simple setup using only the BeautifulSoup4 and Requests libraries. For tasks requiring browser operations such as logging in, I use Selenium or Pyppeteer.</p>
              <p>The data is fetched by a Python script running on AWS Lambda, which saves the results as a CSV file in S3 for display.</p>
            </div>
            <div className={styles.scrapeTool}>
              <DataFetcher>
                {(data) => (
                  <table>
                    <thead>
                      <tr>
                        <th>Status</th>
                        <th>Title</th>
                        <th>Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, index) => (
                        <tr key={index}>
                          <td>{row.Status}</td>
                          <td>{row.Title}</td>
                          <td>{row.Name}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </DataFetcher>
            </div>
          </div>
        </section>
        <section id="section4" className={styles.section}>
          <h2>Section 4</h2>
        </section>
        <section id="section5" className={styles.section}>
          <h2>Contact</h2>
        </section>
      </main>
    </div>
  );
};

export default Home;
