import styles from "../styles/EpisodeCard.module.css";
import Image from "next/image";
import Blank from "../assets/Blank.png";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";

const EpisodeCard = ({ data, uniqueKey }) => {
  useEffect(() => {
    if (!data) return;
    let summary = document.getElementById(`summary-${uniqueKey}`);
    summary.innerHTML = data.summary
      ? data.summary
      : "<p>Summary Unavailable :(</p>";
  }, [data, uniqueKey]);

  return (
    <div className={styles.container}>
      <div className={styles.headers}>
        <h4 className={styles.title}>
          {data.number}. {data.name}
        </h4>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>{data.airdate}</div>
          <div className={styles.info}>
            <FaStar color="gold" /> {data.rating.average}
          </div>
        </div>
      </div>
      <div className={styles.imageWrapper}>
        {data.image ? (
          <picture>
            <source src={data.image.original} type="image/webp" />
            <img
              className={styles.image}
              src={data.image.original}
              alt={`Episode ${data.number}`}
              loading="lazy"
            />
          </picture>
        ) : (
          <Image
            className={styles.image}
            src={Blank}
            alt={`Episode ${data.number}`}
            objectFit="cover"
          />
        )}
      </div>
      <div id={`summary-${uniqueKey}`} className={styles.summary}></div>
    </div>
  );
};

export default EpisodeCard;
