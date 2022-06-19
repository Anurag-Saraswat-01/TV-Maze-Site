import styles from "../styles/SeasonCard.module.css";
import Image from "next/image";
import Blank from "../assets/BlankPotrait.png";

const SeasonCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {data.image ? (
          <img
            src={data.image.original}
            alt={`Season ${data.number}`}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <Image
            src={Blank}
            alt={`Season ${data.number}`}
            className={styles.image}
            objectFit="cover"
          />
        )}
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>Season {data.number}</h4>
        {data.premiereDate && (
          <h5 className={styles.year}>{data.premiereDate.slice(0, 4)}</h5>
        )}
      </div>
    </div>
  );
};

export default SeasonCard;
