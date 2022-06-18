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
      : "<p>Summary Unavailable</p>";
  }, [data]);

  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={data.image ? data.image.medium : Blank}
          alt={`Episode ${data.number}`}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>
          {data.number}. {data.name}
        </h4>
        <div className={styles.infoWrapper}>
          <div className={styles.info}>{data.airdate}</div>
          <div className={styles.info}>
            <FaStar /> {data.rating.average}
          </div>
        </div>
        <div id={`summary-${uniqueKey}`} className={styles.summary}></div>
      </div>
    </div>
  );
};

export default EpisodeCard;
