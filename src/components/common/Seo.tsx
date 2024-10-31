import { SEO } from "@/types/common/SEO";
import Head from "next/head";
import React from "react";

function Seo(props: SEO) {
  return (
    <>
      <Head>
        <title>{props.title}</title>
        <meta property="og:type" content="website" />
        <meta property="og:title" content={props.title} />
        <meta property="og:description" content={props.opengraphDescription} />
        <meta property="og:url" content={props.opengraphUrl} />
        <meta
          property="og:image"
          content={props?.opengraphImage?.sourceUrl ?? ""}
        />
      </Head>
    </>
  );
}

export default Seo;
