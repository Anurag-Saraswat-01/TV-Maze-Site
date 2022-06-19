import styles from "../styles/404.module.css";
import Link from "next/link";

export default function FourOhFour() {
  return (
    <main className={styles.container}>
      <h1>404 - Page Not Found :(</h1>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </main>
  );
}
