import styles from "../styles/SearchCard.module.css";
import Image from "next/image";

const SearchCard = ({ data }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={data.image.medium}
          alt={data.name}
          width={200}
          height={200}
        />
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.title}>{data.name}</h4>
        <h5 className={styles.year}>{`(${data.premiered.slice(0, 4)})`}</h5>
      </div>
    </div>
  );
};

export default SearchCard;
