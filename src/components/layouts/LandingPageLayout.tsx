import type { FC, ReactNode } from "react";
import Header from "../global/Header";
import Footer from "../global/Footer";

type PageLayoutProp = { children: ReactNode; hideHeader?: boolean };

const LandingPageLayout: FC<PageLayoutProp> = ({ children }) => (
  <>
    <div className="bg-base flex min-h-screen flex-col">
      <Header />

      <main className="flex flex-1 flex-col">{children}</main>

      <Footer />
    </div>
  </>
);

export default LandingPageLayout;
