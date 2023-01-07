// import React from "react";

// const Page = () => {
//   return <div>Movie id in Url</div>;
// };

// export default Page;

import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Page1 = ({ movie }) => {
  const router = useRouter();

  return (
    <div>
      <button onClick={() => router.back()}>
        <h1>Go Back</h1>
      </button>
      {/* <h1>Page:{router.query.id}</h1> */}
      <h3>{movie.Title}</h3>
      <div style={{ display: "flex" }}>
        {movie.Images.map((imge) => {
          return (
            <div>
              <Image src={imge} alt={"movie-image"} width="300" height="200" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  let response = await fetch(`https://movies-database-gold.vercel.app/movies`);
  let data = await response.json();
  return {
    paths: data.map((movie) => ({
      params: { id: movie.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(contex) {
  const {
    params: { id },
  } = contex;

  let response = await fetch(
    `https://movies-database-gold.vercel.app/movies/${id}`
  );
  let data = await response.json();
  return {
    props: {
      movie: data,
    },
  };
}

export default Page1;
