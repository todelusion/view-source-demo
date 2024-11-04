import useScreen from "@/hooks/useScreen";
import { useScrollToItem } from "@/hooks/useScrollToItem";
import getAnchorId from "@/utils/getAnchorId";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
const NAV_ITEMS = [
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "THIS MONTH",
    href: "#this-month",
  },
  {
    label: "OUR BRANDS",
    href: "#our-brands",
  },
  {
    label: "SUBMIT PRODUCTS",
    href: "#submit-products",
  },
];

function Layout({ children }: { children: React.ReactNode }) {
  const { asPath } = useRouter();
  const [client, setClient] = useState(false);
  const isOver768 = useScreen({ width: 768, type: "OVER" });

  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const scrollToItem = useScrollToItem(containerRef, listRef);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <nav
        ref={containerRef}
        className="fixed bottom-0 z-50 w-full overflow-x-auto overflow-y-hidden border border-dashed border-LOCAVORE-BLACK bg-LOCAVORE-POST-IT-GREEN px-4 md:px-[110px]"
      >
        <div
          ref={listRef}
          className="flex h-auto w-max items-center justify-start gap-20 py-5 md:w-full md:justify-between md:gap-0"
        >
          {NAV_ITEMS.map((item, index) => (
            <div
              key={item.label}
              className="flex w-full justify-center whitespace-nowrap md:w-max"
            >
              <Link
                href={item.href}
                key={item.label}
                onClick={() => {
                  if (isOver768) return;
                  scrollToItem(index);
                }}
                className="hover:opacity-70"
              >
                <span className="text-center font-fake-receipt text-xs font-normal leading-3 text-LOCAVORE-BLACK transition-all duration-300 group-hover:scale-105">
                  {item.label}
                </span>
              </Link>
              {client && asPath.includes(item.href) && (
                <div className="absolute -bottom-1 h-px w-full border-b border-dashed" />
              )}
            </div>
          ))}
        </div>
      </nav>
      {children}
    </>
  );
}

export default Layout;
