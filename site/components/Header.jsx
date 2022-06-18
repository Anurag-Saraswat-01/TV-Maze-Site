import styles from "../styles/Header.module.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push(`/search/${searchTerm.replace(/ /g, "+")}`);
  };

  return (
    <nav className={styles.navbar}>
      <h1 className={styles.navTitle}>
        <Link href="/">
          <a>IMDb but better</a>
        </Link>
      </h1>
      <form className={styles.navForm} role="search" onSubmit={handleSubmit}>
        <input
          className={styles.searchBar}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <FaSearch color="white" size={20} onClick={handleSubmit} />
      </form>
    </nav>
  );
};

export default Header;
