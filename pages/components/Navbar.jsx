import React from "react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div style={{ display: "flex", gap: "20px", fontSize: "22px" }}>
      <Link href="/">Blogs</Link>
      <Link href="/movies">Movies</Link>
      <Link href="/watchlists">Watchlists</Link>
    </div>
  );
}
