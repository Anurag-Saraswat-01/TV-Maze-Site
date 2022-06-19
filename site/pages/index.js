import Head from "next/head";
import styles from "../styles/Home.module.css";
import Carousel from "../components/Carousel";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>IMDb but better</title>
        <meta name="description" content="TV Series Info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Carousel />
        <div className={styles.textWrapper}>
          <h1 className={styles.title}>
            Welcome to <br /> IMDb but better!
          </h1>
          <div className={styles.text}>
            <p>
              IMDb but better is a one-stop Web Application where you can view
              information about any TV show, it&apos;s seasons and each episode!
            </p>
            <p>
              The app is built using{" "}
              <a
                href="https://nextjs.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                NextJS
              </a>{" "}
              and uses the{" "}
              <a
                href="https://www.tvmaze.com/api"
                target="_blank"
                rel="noopener noreferrer"
              >
                TVmaze API
              </a>
              .
            </p>
            <p>
              Use the search option in the navbar to start looking for your
              favourite shows! Have fun exploring!
            </p>
            <p>Peace Out! ✌</p>
          </div>
        </div>
      </main>
    </div>
  );
}
