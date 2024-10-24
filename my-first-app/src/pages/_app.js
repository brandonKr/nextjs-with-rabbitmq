import Head from "next/head";
import "@/styles/globals.css";
import RootLayOut from "@/components/RootLayOut";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>My App</title>
      </Head>
      <div>
        <RootLayOut>
            <Component {...pageProps} />
          </RootLayOut>
        </div>
    </>
  );
}
