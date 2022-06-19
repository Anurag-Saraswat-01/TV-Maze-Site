import styles from "../styles/Header.module.css";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import TV from "../assets/television.png";

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
      <Link href="/">
        <a>
          <div className={styles.navBrand}>
            <div className={styles.imageWrapper}>
              <Image src={TV} alt="nav logo" />
            </div>
            <h1 className={styles.navTitle}>IMDb but better</h1>
          </div>
        </a>
      </Link>
      <form className={styles.navForm} role="search" onSubmit={handleSubmit}>
        <input
          className={styles.searchBar}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          onChange={handleChange}
        />
        <FaSearch
          className={styles.searchIcon}
          size={20}
          onClick={handleSubmit}
        />
      </form>
    </nav>
  );
};

export default Header;
