import styles from "../../../../../styles/Season.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Link from "next/link";
import EpisodeCard from "../../../../../components/EpisodeCard";
import Blank from "../../../../../assets/BlankPotrait.png";
import Loader from "../../../../../components/Loader";

const season = () => {
  const router = useRouter();
  const { id, sid } = router.query;
  const [seasonData, setSeasonData] = useState(null);
  const [episodeData, setEpisodeData] = useState(null);
  const [loading, setLoading] = useState(null);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    fetch(
      `https://api.tvmaze.com/singlesearch/shows?q=${id
        .replace(/_/g, " ")
        .replace(/:/g, "")}&embed[]=seasons`
    )
      .then((res) =>
        res
          .json()
          .then((resData) => setSeasonData(resData))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    setLoading(true);
    if (!sid || !seasonData) return;
    fetch(
      `https://api.tvmaze.com/seasons/${
        seasonData._embedded.seasons[parseInt(sid) - 1].id
      }/episodes`
    )
      .then((res) =>
        res
          .json()
          .then((resData) => setEpisodeData(resData))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [sid, seasonData]);

  useEffect(() => {
    if (!seasonData || !episodeData) {
      setLoading(true);
      return;
    }
    setLoading(false);
    // delete later
    console.log(seasonData);
    console.log(episodeData);
  }, [seasonData, episodeData]);

  useEffect(() => {
    if (loading || !seasonData || !sid) return;
    let summary = document.getElementById("summary");
    summary.innerHTML = seasonData._embedded.seasons[parseInt(sid) - 1].summary
      ? seasonData._embedded.seasons[parseInt(sid) - 1].summary
      : "<p>Summary Unavailable :(</p>";
  }, [loading, seasonData, sid]);

  return loading || !episodeData || !seasonData ? (
    <Loader loading={loading} />
  ) : (
    <>
      <Head>
        <title>
          {seasonData.name} - S{sid}
        </title>
        <meta name="description" content="TV Series Info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        {/* image and summary section */}
        <section className={styles.information}>
          <h2 className={styles.title}>
            {seasonData.name} - Season {sid}
          </h2>
          <div className={styles.imageWrapper}>
            {seasonData.image.original ? (
              <img
                className={styles.image}
                src={
                  seasonData._embedded.seasons[parseInt(sid) - 1].image.original
                    ? seasonData._embedded.seasons[parseInt(sid) - 1].image
                        .original
                    : seasonData.image.original
                }
                alt={seasonData.name}
                loading="lazy"
              />
            ) : (
              <Image
                className={styles.image}
                src={Blank}
                alt={seasonData.name}
                objectFit="cover"
              />
            )}
          </div>
          <div className={styles.textWrapper}>
            <div id="summary" className={styles.summary}></div>
            <div className={styles.navbar}>
              <Link
                href={`/shows/${id}/seasons/${
                  parseInt(sid) === 1
                    ? seasonData._embedded.seasons.length
                    : parseInt(sid) - 1
                }`}
              >
                <a>
                  <div className={styles.nav}>
                    <FaAngleLeft /> Prev
                  </div>
                </a>
              </Link>
              <Link
                href={`/shows/${id}/seasons/${
                  parseInt(sid) === seasonData._embedded.seasons.length
                    ? 1
                    : parseInt(sid) + 1
                }`}
              >
                <a>
                  <div className={styles.nav}>
                    Next <FaAngleRight />
                  </div>
                </a>
              </Link>
            </div>
          </div>
        </section>
        {/* episodes section */}
        <section className={styles.episodes}>
          <h3 className={styles.episodeTitle}>Episodes</h3>
          <div className={styles.episodeWrapper}>
            {episodeData.map((data, key) => {
              return (
                <div key={key}>
                  <EpisodeCard data={data} uniqueKey={key} />
                </div>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
};

export default season;
