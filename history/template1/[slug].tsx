import Seo from "@/components/common/Seo";
import client from "@/service/apollo-client";
import { TEMPLATE1_SLUGs, TEMPLATE1_SUBPAGE } from "@/service/template1Service";
import {
  Template1ACF,
  Template1SubPageRoot,
} from "@/types/Page/Template1Subpage";
import { SEO } from "@/types/common/SEO";
import { gql, useQuery } from "@apollo/client";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: TEMPLATE1_SLUGs() });
  const paths = data.pages.nodes.map((node: { slug: string }) => {
    const permalinkID = node.slug;

    return {
      params: { slug: permalinkID },
    };
  });

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const { data } = await client.query<Template1SubPageRoot>({
    query: TEMPLATE1_SUBPAGE(slug),
  });
  const template1SubPage = data.pages.nodes[0].template1ACF;
  const seo = data.pages.nodes[0].seo;

  return {
    props: { template1SubPage, seo },
    revalidate: 1,
  };
};

export default function Template1SubPage(props: {
  template1SubPage: Template1ACF;
  seo: SEO;
}) {
  const { seo, template1SubPage } = props;
  return (
    <>
      <Seo {...seo} />
      <main className="relative min-h-screen overflow-hidden">
        <section className="pt-32 text-center">
          <h1 className="heading-1">{template1SubPage.title}</h1>
          <p className="heading-5 text-gray-500">
            {template1SubPage.description}
          </p>
        </section>
      </main>
    </>
  );
}
