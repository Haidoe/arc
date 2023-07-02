import type { FC, ReactNode } from "react";
import Header from "../global/Header";
import Footer from "../global/Footer";

type PageLayoutProp = { children: ReactNode };

const MainPageLayout: FC<PageLayoutProp> = ({ children }) => (
  <>
    <div className="flex min-h-screen flex-col bg-base">
      <Header />

      <main className="flex flex-1 flex-col">{children}</main>

      <Footer />
    </div>
  </>
);

export default MainPageLayout;
