import styles from "../../../styles/Search.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchCard from "../../../components/SearchCard";

const searchResults = () => {
  const router = useRouter();
  const { id } = router.query;
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!id) return;
    fetch(`https://api.tvmaze.com/search/shows?q=${id}`)
      .then((res) =>
        res
          .json()
          .then((resData) => setResults(resData))
          .catch((err) => console.log(err))
      )
      .catch((err) => console.log(err));
  }, [id]);

  //for reference, delete later
  useEffect(() => {
    if (!results) return;
    console.log(results);
  }, [results]);

  return (
    results && (
      <main>
        <h2 className={styles.title}>Showing Search Results for "{id}"</h2>
        <div className={styles.resultWrapper}>
          {results.map((data, key) => {
            return (
              <Link href={`/shows/${data.show.id}`} key={key}>
                <SearchCard data={data.show} />
              </Link>
            );
          })}
        </div>
      </main>
    )
  );
};

export default searchResults;
