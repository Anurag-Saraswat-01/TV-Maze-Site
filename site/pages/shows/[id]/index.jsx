import styles from "../../../styles/Shows.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaExternalLinkAlt } from "react-icons/fa";
import SeasonCard from "../../../components/SeasonCard";
import CastCard from "../../../components/CastCard";

const show = () => {
  const router = useRouter();
  const { id } = router.query;
  const [showData, setShowData] = useState(null);
  const [crewData, setCrewData] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(
      `https://api.tvmaze.com/shows/${id}?embed[]=seasons&embed[]=cast&embed[]=crew`
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
    if (!showData) return;
    console.log(showData);
    let summary = document.getElementById("summary");
    summary.innerHTML = showData.summary;
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
  }, [showData]);

  return (
    showData && (
      <main>
        <h2 className={styles.title}>{showData.name}</h2>
        {/* main info div */}
        <div className={styles.infoWrapper}>
          <h4 className={styles.info}>{showData.type}</h4>.
          <h4 className={styles.info}>{showData.language}</h4>.
          <h4 className={styles.info}>{`${showData.premiered.slice(0, 4)}-${
            showData.ended ? showData.ended.slice(0, 4) : ""
          }`}</h4>
          .<h4 className={styles.info}>{showData.averageRuntime}m</h4>
        </div>
        <section className={styles.information}>
          <div className={styles.imageWrapper}>
            <Image
              src={showData.image.original}
              alt={showData.name}
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={showData.image.medium}
            />
          </div>
          <div className={styles.textWrapper}>
            <div id="summary" className={styles.summary}></div>
            <div className={styles.textInfo}>
              <div className={styles.rating}>
                <FaStar /> {showData.rating.average}/10
              </div>
              <div className={styles.extUrl}>
                <a
                  href={showData.officialSite}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Official Site <FaExternalLinkAlt />
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
                <div key={key}>
                  <SeasonCard data={data} />
                </div>
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
    )
  );
};

export default show;
