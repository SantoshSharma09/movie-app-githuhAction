import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Page = ({ movies = [] }) => {
  const [count, setCount] = useState([]);

  const router = useRouter();

  const getData = async () => {
    let res = await fetch("http://localhost:3001/watchlists");
    let data = await res.json();
    setCount(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleClick = async (id, Title, Images) => {
    let insta_obj = {
      id,
      Title,
      Images,
    };
    let res = await fetch(`http://localhost:3001/watchlists`, {
      method: "POST",
      body: JSON.stringify(insta_obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await res.json();
    getData();
    console.log("san", data);
  };

  const handlDetails = (id) => {
    router.push(`/movies/${id}`);
  };

  return (
    <>
      <Head>
        <title>Movies Page</title>
        <meta titile="description" content="blogs,react.js,typescript"></meta>
      </Head>
      <main>
        <h2>Total Watchlist : {count.length}</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(1,1rf)" }}>
          {movies.map((movie) => {
            return (
              <div key={movie.id}>
                <h1>{movie.Title}</h1>
                <div style={{ display: "flex" }}>
                  {movie.Images.map((imge, index) => {
                    return (
                      <div key={index}>
                        <Image
                          src={imge}
                          alt={"movie-image"}
                          width="300"
                          height="200"
                        />
                      </div>
                    );
                  })}
                </div>
                <button
                  onClick={() =>
                    handleClick(movie.id, movie.Title, movie.Images)
                  }
                >
                  Add to Watchlist
                </button>
                <button onClick={() => handlDetails(movie.id)}>Details</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  let response = await fetch("https://movies-database-gold.vercel.app/movies");
  let data = await response.json();

  return {
    props: {
      movies: data,
    },
  };
}

export default Page;
