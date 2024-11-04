import getAnchorId from "@/utils/getAnchorId";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const NAV_ITEMS = [
  {
    label: "ABOUT",
    href: "#about",
  },
  {
    label: "OUR BRANDS",
    href: "#our-brands",
  },
  {
    label: "THIS MONTH",
    href: "#this-month",
  },
  {
    label: "SUBMIT PRODUCTS",
    href: "#submit-products",
  },
];

function Layout({ children }: { children: React.ReactNode }) {
  const { asPath } = useRouter();
  const [client, setClient] = useState(false);

  useEffect(() => {
    setClient(true);
  }, []);

  return (
    <>
      <nav className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border border-dashed border-LOCAVORE-BLACK bg-LOCAVORE-POST-IT-GREEN px-4 py-5 xl:px-[110px]">
        {NAV_ITEMS.map((item) => (
          <div key={item.label} className="relative">
            <Link
              href={item.href}
              key={item.label}
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
      </nav>
      {children}
    </>
  );
}

export default Layout;
