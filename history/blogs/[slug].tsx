import { GetStaticPaths, GetStaticProps } from "next";
import client from "@/service/apollo-client";
import { BLOGIDs, BLOGS, FIND_BLOGS_PREV_NEXT } from "@/service/blogsService";
import { BlogNode, BlogRoot } from "@/types/Posts/Blog";
import { PageInfo } from "@/types/common";
import parseDateId, { extractDateTime } from "@/utils/parseDateId";
import { polyfill } from "interweave-ssr";
import { Interweave } from "interweave";
import Seo from "@/components/common/Seo";
import { useQuery } from "@apollo/client";
import { CursorRoot } from "@/types/Posts/Cursor";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";

polyfill();

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await client.query({ query: BLOGIDs() });
  const paths = res.data.blogs.nodes.map((node: { uri: string }) => ({
    params: { slug: extractDateTime(node.uri) },
  }));

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params?.slug as string;
  const dateQuery = parseDateId(id);
  const { data } = await client.query<BlogRoot>({
    query: BLOGS({ dateQuery }),
  });
  const blog = data.blogs.nodes[0]; //內頁通常只 query 一筆
  const pageInfo = data.blogs.pageInfo;

  return {
    props: { blog, pageInfo },
    revalidate: 1,
  };
};

export default function BlogInner(props: {
  blog: BlogNode;
  pageInfo: PageInfo;
}) {
  const { blog, pageInfo } = props;
  const { data, loading } = useQuery<CursorRoot>(
    FIND_BLOGS_PREV_NEXT(pageInfo.startCursor, pageInfo.endCursor)
  );

  const beforeUri = data?.before.nodes[0]?.uri;
  const afterUri = data?.after.nodes[0]?.uri;
  const shouldShowPrevNext = (uri?: string) =>
    uri ? "visible pointer-events-auto" : "invisible pointer-events-none";

  return (
    <>
      <Seo {...blog.seo} />
      <main className="relative min-h-screen overflow-hidden pt-32">
        <div className="container">
          <h1 className="heading-1">{blog.title}</h1>
          <div className="h-7">
            {loading && <Skeleton />}
            {loading && <Skeleton />}
            {beforeUri && (
              <Link
                href={beforeUri}
                className={`${shouldShowPrevNext(beforeUri)} mr-5 `}
              >
                <span>上一頁</span>
              </Link>
            )}
            {afterUri && (
              <Link href={afterUri} className={shouldShowPrevNext(afterUri)}>
                下一頁
              </Link>
            )}
          </div>
          <Interweave content={blog.blogInnerACF.content} className="wp" />
        </div>
      </main>
    </>
  );
}
