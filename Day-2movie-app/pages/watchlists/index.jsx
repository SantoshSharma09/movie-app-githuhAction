import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Page = ({ watchlists = [] }) => {
  const [dat, setDat] = useState(watchlists);

  const router = useRouter();

  const getdat = async () => {
    let re = await fetch("http://localhost:3001/watchlists");
    let d = await re.json();
    setDat(d);
  };

  useEffect(() => {
    getdat();
  }, []);

  const handleClick = async (id) => {
    let res = await fetch(`http://localhost:3001/watchlists/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "applicatio/json",
      },
    });
    let data = await res.json();
    getdat();
  };

  return (
    <>
      <Head>
        <title>Watchlist Page</title>
        <meta titile="description" content="blogs,react.js,typescript"></meta>
      </Head>
      <main>
        <h1>Watchlist Items : {dat.length}</h1>
        <div style={{ display: "grud", gridTemplateColumns: "repeat(1,1fr)" }}>
          {dat.map((watch) => {
            return (
              <div key={watch.id}>
                <h1>{watch.Title}</h1>

                <div style={{ display: "flex" }}>
                  {watch.Images.map((imge) => {
                    return (
                      <div key={imge}>
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
                <button onClick={() => handleClick(watch.id)}>Delete</button>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
};

export async function getServerSideProps() {
  let response = await fetch("http://localhost:3001/watchlists");
  let data = await response.json();

  return {
    props: {
      watchlists: data,
    },
  };
}

export default Page;
