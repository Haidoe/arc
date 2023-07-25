import { useRouter } from "next/router";
import type { FC, ReactNode } from "react";
import Header from "~/components/global/Header.jsx";
import MenuNavigationMobile from "~/components/global/MenuNavigationMobile.jsx";

type PageLayoutProp = { children: ReactNode; hideHeader?: boolean };

const MainPageLayout: FC<PageLayoutProp> = ({ children, hideHeader }) => {
  const router = useRouter();

  const { pathname } = router;

  const urlsWithMobileNav = [
    "/home",
    "/production/[productionId]/dashboard",
    "/production/[productionId]/report",
  ];

  const adtlClasses = urlsWithMobileNav.includes(pathname)
    ? "pb-[100px] lg:pb-0"
    : "";

  return (
    <>
      <div
        className={`bg-base flex min-h-screen min-w-[320px] flex-col ${adtlClasses} `}
      >
        {!hideHeader && <Header />}

        <main className="flex flex-1 flex-col">{children}</main>

        <MenuNavigationMobile />
      </div>
    </>
  );
};

export default MainPageLayout;
