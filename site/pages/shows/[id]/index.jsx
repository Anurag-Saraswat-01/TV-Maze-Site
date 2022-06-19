import styles from "../../../styles/Shows.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import SeasonCard from "../../../components/SeasonCard";
import CastCard from "../../../components/CastCard";
import Head from "next/head";
import Link from "next/link";
import Blank from "../../../assets/BlankPotrait.png";
import Loader from "../../../components/Loader";

const show = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showData, setShowData] = useState(null);
  const [crewData, setCrewData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (!id) return;
    fetch(
      `https://api.tvmaze.com/singlesearch/shows?q=${id.replace(
        /_/g,
        " "
      )}&embed[]=seasons&embed[]=cast&embed[]=crew`
    )
      .then((res) =>
        res
          .json()
          .then((resData) => setShowData(resData))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [id]);

  //   setting inner html cuz response is string
  useEffect(() => {
    if (!showData) {
      setLoading(true);
      return;
    }
    console.log(showData);

    // crew have many roles so to avoid repitition
    const transformCrewData = (data) => {
      let crew = {};
      for (let i = 0; i < data.length; i++) {
        if (crew.hasOwnProperty(data[i].person.id)) {
          crew[data[i].person.id].role.push(data[i].type);
        } else {
          crew[data[i].person.id] = {
            name: data[i].person.name,
            role: [data[i].type],
            img: data[i].person.image,
          };
        }
      }
      return crew;
    };
    setCrewData(transformCrewData(showData._embedded.crew));
    setLoading(false);
  }, [showData]);

  useEffect(() => {
    if (loading) return;
    let summary = document.getElementById("summary");
    summary.innerHTML = showData.summary;
  }, [loading, showData]);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <>
      <Head>
        <title>{showData.name}</title>
        <meta name="description" content="TV Series Info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        {/* main info div */}
        <section className={styles.information}>
          <div className={styles.headers}>
            <h2 className={styles.title}>{showData.name}</h2>
            <div className={styles.infoWrapper}>
              <h4 className={styles.info}>{showData.type}</h4>.
              <h4 className={styles.info}>{showData.language}</h4>.
              <h4 className={styles.info}>{`${showData.premiered.slice(0, 4)}-${
                showData.ended ? showData.ended.slice(0, 4) : ""
              }`}</h4>
              .<h4 className={styles.info}>{showData.averageRuntime}m</h4>
            </div>
          </div>
          <div className={styles.imageWrapper}>
            {showData.image ? (
              <picture>
                <source srcSet={showData.image.original} type="image/webp" />
                <img
                  className={styles.image}
                  src={showData.image.original}
                  alt={showData.name}
                  loading="lazy"
                />
              </picture>
            ) : (
              <Image src={Blank} alt={showData.name} objectFit="cover" />
            )}
          </div>
          <div className={styles.textWrapper}>
            <div className={styles.genreWrapper}>
              {showData.genres.map((data, key) => {
                return (
                  <div className={styles.genre} key={key}>
                    {data}
                  </div>
                );
              })}
            </div>
            <div id="summary" className={styles.summary}></div>
            <div className={styles.textInfo}>
              <div className={styles.rating}>
                <div className={styles.iconWrapper}>
                  <FaStar color="gold" />
                </div>
                {showData.rating.average}/10
              </div>
              <div>
                <a
                  href={showData.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.extUrl}
                >
                  Official Site
                  <div className={styles.iconWrapper}>
                    <FaExternalLinkAlt />
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        {/* seasons div */}
        <section className={styles.seasons}>
          <h3 className={styles.seasonTitle}>Seasons</h3>
          <div className={styles.seasonWrapper}>
            {showData._embedded.seasons.map((data, key) => {
              return (
                <Link href={`${id}/seasons/${parseInt(key) + 1}`} key={key}>
                  <a>
                    <SeasonCard data={data} />
                  </a>
                </Link>
              );
            })}
          </div>
        </section>
        {/* cast div */}
        <section className={styles.cast}>
          <h3 className={styles.castTitle}>Cast</h3>
          <div className={styles.castWrapper}>
            {showData._embedded.cast.map((data, key) => {
              return (
                <div key={key}>
                  <CastCard
                    name={data.person.name}
                    role={data.character.name}
                    img={data.person.image}
                  />
                </div>
              );
            })}
          </div>
        </section>
        {/* crew div */}
        <section className={styles.crew}>
          <h3 className={styles.crewTitle}>Crew</h3>
          <div className={styles.crewWrapper}>
            {crewData &&
              Object.keys(crewData)
                .slice(0, 12)
                .map((data, key) => {
                  return (
                    <div key={key}>
                      <CastCard
                        name={crewData[data].name}
                        role={crewData[data].role}
                        img={crewData[data].img}
                      />
                    </div>
                  );
                })}
          </div>
        </section>
      </main>
    </>
  );
};

export default show;
