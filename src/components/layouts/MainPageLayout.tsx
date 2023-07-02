import type { FC, ReactNode } from "react";
import Header from "../global/Header";

type PageLayoutProp = { children: ReactNode };

const MainPageLayout: FC<PageLayoutProp> = ({ children }) => (
  <>
    <div className="flex min-h-screen flex-col bg-base">
      <Header />

      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  </>
);

export default MainPageLayout;
