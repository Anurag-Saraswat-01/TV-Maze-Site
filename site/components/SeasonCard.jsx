import styles from "../styles/SeasonCard.module.css";
import Image from "next/image";

const SeasonCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={data.image.medium}
          alt={`Season ${data.number}`}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>Season {data.number}</h4>
        <h5 className={styles.year}>{data.premiereDate.slice(0, 4)}</h5>
      </div>
    </div>
  );
};

export default SeasonCard;
