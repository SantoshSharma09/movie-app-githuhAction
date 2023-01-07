import Head from "next/head";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Page = ({ blogs = [] }) => {
  const router = useRouter();

  const handleClick = (id) => {
    // alert("visting page /", id);
    router.push(`/${id}`);
  };

  return (
    <>
      <Head>
        <title>Blogs Page</title>
        <meta titile="description" content="blogs,react.js,typescript"></meta>
        <link ref="icon" href="/favicon.ico" />
      </Head>
      <main>
        {blogs.map((blog) => {
          console.log(blog.title);
          return (
            <div key={blog.id}>
              <h1 onClick={() => handleClick(blog.id)}>{blog.title}</h1>
            </div>
          );
        })}
      </main>
    </>
  );
};

export async function getStaticProps() {
  let response = await fetch("http://localhost:3001/blogs");
  let data = await response.json();
  return {
    props: {
      blogs: data,
    },
  };
}

export default Page;
