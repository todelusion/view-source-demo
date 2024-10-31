import { GetStaticProps } from "next";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Skeleton from "react-loading-skeleton";

// service & hooks
import client from "@/service/apollo-client";
import { BLOGS, BLOG_PAGE } from "@/service/blogsService";
import getTextContent from "@/utils/getTextContent";
import useClient from "@/hooks/useClient";
import { useQuery } from "@apollo/client";
import { pagesQuery } from "@/service/query/pagesQuery";

// components
import Pagination from "@/components/common/Pagination";
import Seo from "@/components/common/Seo";
import { BlogNode, BlogRoot } from "@/types/Posts/Blog";
import { PageInfo } from "@/types/common";
import { SEO } from "@/types/common/SEO";
import getNumbers from "@/utils/getNumbers";
import { postsQuery } from "@/service/query/postsQuery";
import { taxonomiesQuery } from "@/service/query/taxonomyQuery";
import { Taxonomy } from "@/types/common/Taxonomy";
import { TaxQuery } from "@/types/common/wpGraphQL";
import Card from "@/components/Card";
import { buildCategoryTree } from "@/utils/buildCategoryTree";

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await client.query<BlogRoot>({
    query: BLOGS(
      undefined,
      undefined,
      pagesQuery({ name: "blogs" }, { isChildQuery: true }),
      taxonomiesQuery("blogtypes", { isChildQuery: true })
    ),
  });
  const seo = data.pages.nodes[0].seo;
  const taxonomies = buildCategoryTree(data.blogtypes.nodes);
  const pageInfo = data.blogs.pageInfo;

  return {
    props: { seo, pageInfo, taxonomies },
    revalidate: 1,
  };
};

export default function Blog(props: {
  seo: SEO;
  pageInfo: PageInfo;
  taxonomies: Taxonomy[];
}) {
  const { seo, pageInfo: initPageInfo, taxonomies } = props;
  const { query, push, pathname } = useRouter();
  const [blogs, setBlog] = useState<BlogNode[]>();
  const [pageInfo, setPageInfo] = useState<PageInfo>(initPageInfo);

  const isClient = useClient();

  // data fetching
  const perSize = 6;
  const totalPage = Math.ceil(pageInfo.offsetPagination.total / perSize);
  const currentPage = query.page ? parseInt(query.page as string, 10) : 1;
  const filter = (query.filter as string) || undefined;
  const taxQuery: TaxQuery | undefined =
    filter === undefined || filter === "全部"
      ? undefined
      : { taxArray: [{ field: "NAME", taxonomy: "BLOGTYPE", terms: filter }] };

  const { data, loading } = useQuery<BlogRoot>(
    BLOGS(
      {
        offsetPagination: { size: 6, offset: (currentPage - 1) * 6 },
        taxQuery,
      },
      {
        nodesQuery: `blogTypesACF {
      nodes {
        name
      }
    }`,
      }
    )
  );

  const onPagination = (current: number) => {
    push({ pathname, query: { ...query, page: current } });
  };
  const onFilter = (name: string) => {
    push({ pathname, query: { filter: name } });
  };

  useEffect(() => {
    if (!data) return;
    setBlog(data.blogs.nodes);
    setPageInfo(data.blogs.pageInfo);
  }, [data]);

  // style
  const activeFilter = "bg-black text-white";
  const all = taxonomies.find(
    (tax) => decodeURIComponent(tax.name) === decodeURIComponent(tax.slug)
  );

  return (
    <>
      <Seo {...seo} />
      <main className="relative pt-32">
        <section className="relative min-h-screen">
          <ul className="text-rightz absolute right-5 top-0 flex flex-col items-end space-y-5">
            <li>
              <button
                onClick={() => onFilter("全部")}
                style={{ fontSize: 20 }}
                className={`heading-3-specific ${
                  filter === "全部" || filter === undefined ? activeFilter : ""
                }`}
              >
                {all?.name || "全部"}
              </button>
            </li>
            {taxonomies.map((tax) => {
              if (decodeURIComponent(tax.name) === decodeURIComponent(tax.slug))
                return;
              return (
                <li key={tax.name} className="flex flex-col items-end">
                  <button
                    onClick={() => onFilter(tax.name)}
                    style={{ fontSize: 20 }}
                    className={`heading-3-specific ${
                      filter === tax.name ? activeFilter : ""
                    }`}
                  >
                    {tax.name}
                  </button>
                  {tax.children &&
                    tax.children.length > 0 &&
                    tax.children.map((item) => (
                      <button
                        key={item.name}
                        onClick={() => onFilter(item.name)}
                        className={`heading-5 ${
                          filter === item.name ? activeFilter : ""
                        }`}
                      >
                        {item.name}
                      </button>
                    ))}
                </li>
              );
            })}
          </ul>
          {!loading && blogs && (
            <ul className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 lg:pb-10 xl:grid-cols-3">
              {blogs.map((blog) => (
                <li key={blog.title} className="relative">
                  <div className="absolute -top-5 left-0 bg-slate-700 text-white">
                    {blog.blogTypesACF.nodes?.[0].name}
                  </div>
                  <Card
                    href={blog.uri}
                    title={blog.title}
                    description={
                      isClient ? getTextContent(blog.blogInnerACF.content) : ""
                    }
                    img={{
                      src: blog.seo.opengraphImage?.sourceUrl,
                      alt: blog.seo.opengraphImage?.sourceUrl ?? blog.title,
                    }}
                  />
                </li>
              ))}
            </ul>
          )}
          {loading && (
            <ul className="mx-auto grid max-w-7xl gap-6 px-4 pb-6 sm:grid-cols-2 lg:grid-cols-3 lg:pb-10 xl:grid-cols-3">
              {getNumbers(6).map((num) => (
                <li key={num}>
                  <Skeleton
                    enableAnimation
                    height={280}
                    width={"100%"}
                    className="cardImgLoading"
                  />
                </li>
              ))}
            </ul>
          )}

          {totalPage !== 0 && (
            <Pagination
              totalPage={totalPage}
              currentPage={query.page ? Number(query.page) : undefined}
              onClick={onPagination}
              classNames={{
                textColor: "text-white",
                textBgColor: "bg-black",
                spreadColor: "text-black",
              }}
              className="mx-auto w-max"
            />
          )}
          {totalPage === 0 && <p className="base text-center">沒有資料</p>}
        </section>
      </main>
    </>
  );
}
