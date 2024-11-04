import type { AppProps } from "next/app";
import "@/styles/globals.css";
import "@/styles/font.css";
import Layout from "@/layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
