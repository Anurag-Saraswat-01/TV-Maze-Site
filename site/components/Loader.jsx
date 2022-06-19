import styles from "../styles/Loader.module.css";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loader = ({ loading }) => {
  return (
    <main className={styles.container}>
      <h1>Loading Please Wait :D</h1>
      <PacmanLoader color="black" loading={loading} />
    </main>
  );
};

export default Loader;
