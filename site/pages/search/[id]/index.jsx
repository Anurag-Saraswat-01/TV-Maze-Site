import styles from "../../../styles/Search.module.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Link from "next/link";
import SearchCard from "../../../components/SearchCard";
import Head from "next/head";
import Loader from "../../../components/Loader";

const searchResults = () => {
  const router = useRouter();
  const { id } = router.query;
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    if (!results) {
      setLoading(true);
      return;
    }
    setLoading(false);
    console.log(results);
  }, [results]);

  return loading ? (
    <Loader loading={loading} />
  ) : (
    <>
      <Head>
        <title>Search results for {id}</title>
        <meta name="description" content="TV Series Info" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.container}>
        <h2 className={styles.title}>
          Showing Search Results for &quot;{id}&quot;
        </h2>
        <div className={styles.resultWrapper}>
          {results.map((data, key) => {
            return (
              <Link
                href={`/shows/${data.show.name
                  .toLowerCase()
                  .replace(/ /g, "_")
                  .replace(/:/g, "")}`}
                key={key}
              >
                <a>
                  <SearchCard data={data.show} />
                </a>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
};

export default searchResults;
