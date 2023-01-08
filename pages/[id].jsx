import { useRouter } from "next/router";
import React from "react";

const Page = ({ blog }) => {
  const router = useRouter();

  return (
    <div>
      <h1 onClick={() => router.back()}>Go Back</h1>
      <h1>Page:{router.query.id}</h1>
      <h3>{blog.title}</h3>
      <p>{blog.description}</p>
    </div>
  );
};

export async function getStaticPaths() {
  let response = await fetch(`http://localhost:3001/blogs`);
  let data = await response.json();
  return {
    paths: data.map((blog) => ({
      params: { id: blog.id.toString() },
    })),
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const {
    params: { id },
  } = context;

  let response = await fetch(`http://localhost:3001/blogs/${id}`);
  let data = await response.json();
  return {
    props: {
      blog: data,
    },
  };
}

export default Page;
