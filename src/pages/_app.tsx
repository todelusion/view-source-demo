import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/font.css";
import Layout from "@/layout";
import Loading from "@/components/common/Loading";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Loading />
      <Component {...pageProps} />
    </Layout>
  );
}
