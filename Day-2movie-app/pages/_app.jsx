// import Navbar from "../components/Navbar";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
// import { Inter } from "@next/font/google";

// const inter = Inter({ subsets: ["Latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <main>
      <Navbar />
      {/* <html lang="en" classNmae={inter.classNmae}> */}
        <Component {...pageProps} />
      {/* </html> */}
    </main>
  );
}

export default MyApp;
