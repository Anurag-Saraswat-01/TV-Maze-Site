import styles from "../styles/Carousel.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import TGP from "../assets/TheGoodPlace.png";
import BB from "../assets/BreakingBad.png";
import B99 from "../assets/B99.png";
import ATLA from "../assets/Atla.png";

const Carousel = () => {
  const [hero, setHero] = useState(0);
  const imageArr = [TGP, BB, B99, ATLA];

  const images = (hero) => {
    return (
      <Image
        src={imageArr[hero]}
        alt="Hero"
        className={styles.heroImage}
        placeholder="blur"
      />
    );
  };

  const updateHero = () => {
    setHero(hero === imageArr.length - 1 ? 0 : hero + 1);
  };
  setInterval(updateHero, 1500);

  return <div className={styles.imageWrapper}>{images(hero)}</div>;
};

export default Carousel;
