import styles from "../styles/CastCard.module.css";
import Image from "next/image";
import PersonPlaceholder from "../assets/Person.png";

const CastCard = ({ name, role, img }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        {img ? (
          <img
            src={img.original}
            alt={name}
            className={styles.image}
            loading="lazy"
          />
        ) : (
          <Image
            className={styles.image}
            src={PersonPlaceholder}
            alt={name}
            objectFit="cover"
          />
        )}
      </div>
      <div className={styles.textWrapper}>
        <h4 className={styles.name}>{name}</h4>
        {typeof role === "string" ? (
          <h5 className={styles.role}>{role}</h5>
        ) : (
          <div className={styles.roleWrapper}>
            {role.map((data, key) => {
              return (
                <h5 className={styles.role} key={key}>
                  {data}
                </h5>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CastCard;
