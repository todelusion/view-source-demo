import Card from "@/components/Card";
import Seo from "@/components/common/Seo";
import client from "@/service/apollo-client";
import { TEMPLATE2_SLUGs, TEMPLATE2_SUBPAGE } from "@/service/template2Service";
import {
  Template2ACF,
  Template2SubPageRoot,
} from "@/types/Page/Template2Subpage";
import { SEO } from "@/types/common/SEO";
import { GetStaticPaths, GetStaticProps } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await client.query({ query: TEMPLATE2_SLUGs() });
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
  const { data } = await client.query<Template2SubPageRoot>({
    query: TEMPLATE2_SUBPAGE(slug),
  });
  const template2SubPage = data.pages.nodes[0].template2ACF;
  const seo = data.pages.nodes[0].seo;

  return {
    props: { template2SubPage, seo },
    revalidate: 1,
  };
};

export default function Template2SubPage(props: {
  template2SubPage: Template2ACF;
  seo: SEO;
}) {
  const { seo, template2SubPage } = props;
  return (
    <>
      <Seo {...seo} />
      <main className="relative min-h-screen overflow-hidden">
        <section className="px-6 pt-32 text-center">
          <div className="container">
            <h2 className="heading-1 mb-10 text-start">所選擇的部落格：</h2>
            <ul className="grid grid-cols-3 gap-10">
              {template2SubPage.relation?.map((item) => (
                <li key={item.title}>
                  <Card
                    href={item.uri}
                    title={item.title}
                    img={{
                      src: item.seo.opengraphImage?.sourceUrl,
                      alt: item.seo.opengraphImage?.altText ?? item.title,
                    }}
                  />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
