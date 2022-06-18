import styles from "../styles/CastCard.module.css";
import Image from "next/image";
import PersonPlaceholder from "../assets/Person.png";

const CastCard = ({ name, role, img }) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <Image
          src={img ? img.medium : PersonPlaceholder}
          alt={name}
          width={200}
          height={200}
        />
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
