import styles from "../styles/SearchCard.module.css";
import Image from "next/image";
import Blank from "../assets/BlankPotrait.png";

const SearchCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {data.image ? (
          <img
            className={styles.image}
            src={data.image.original}
            alt={data.name}
            loading="lazy"
          />
        ) : (
          <Image
            className={styles.image}
            src={Blank}
            alt={data.name}
            objectFit="cover"
          />
        )}
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>{data.name}</h4>
        {data.premiered && (
          <h5 className={styles.year}>{`(${data.premiered.slice(0, 4)})`}</h5>
        )}
      </div>
    </div>
  );
};

export default SearchCard;
