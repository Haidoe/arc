// import modules from next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// import components
import HeaderMobileLanding from "~/components/global/HeaderMobileLanding.jsx";

// import logo
import Logo from "~/assets/icons/Logo.svg";
import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
import Button from "../Button";

// define headers on different pages
const linksOnHeader = {
  "/": [
    {
      name: "Film Production",
      path: "/#filmProduction",
      disabled: false,
    },
    {
      name: "Features",
      path: "/#features",
    },
    {
      name: "About",
      path: "/#about",
    },
    {
      name: "Team",
      path: "/#team",
    },
    {
      name: "Contact",
      path: "/#contact",
    },
  ],
  "/home": [
    {
      name: "Production",
      path: "/home",
      disabled: false,
    },
    {
      name: "Production Report",
      path: "#",
      disabled: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      disabled: true,
    },
  ],
  "/production/[productionId]/report": [
    {
      name: "Production",
      path: "/home",
      disabled: false,
    },
    {
      name: "Production Report",
      path: "/production/[productionId]/report",
      disabled: false,
    },
    {
      name: "Dashboard",
      path: "/production/[productionId]/dashboard",
      disabled: false,
    },
  ],
  "/production/[productionId]/dashboard": [
    {
      name: "Production",
      path: "/home",
      disabled: false,
    },
    {
      name: "Production Report",
      path: "/production/[productionId]/report",
      disabled: false,
    },
    {
      name: "Dashboard",
      path: "/production/[productionId]/dashboard",
      disabled: false,
    },
  ],
  "/kaos/testDailyReports": [
    {
      name: "Production",
      path: "/production",
      disabled: false,
    },
    {
      name: "Production Report",
      path: "/productionReport",
      disabled: true,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
      disabled: false,
    },
  ],
};

const mobileHeaders = {
  "/home": "Production",
  "/production/[productionId]/report": "Production Report",
  "/production/[productionId]/dashboard": "Dashboard",
  "/kaos/testDailyReports": "Production Report",
};

// pattern is a string
// dynamicPath is an object -> key being the dynamic path and value being the value of the dynamic path
const patternToUrl = (pattern, dynamicPath) => {
  let url = pattern;
  for (const [key, value] of Object.entries(dynamicPath)) {
    url = url.replace(`[${key}]`, value);
  }
  return url;
};

// read route and show header depending on route
const Header = () => {
  // get route
  const router = useRouter();
  const { pathname, asPath, query } = router;

  // console.log(router)
  // console.log(pathname);

  const headerLinks = linksOnHeader[pathname] || [];

  console.log(">>", headerLinks, pathname);

  return (
    <header>
      {/* For Desktop */}
      <div className="bg-base hidden items-center justify-between px-8 py-3 sm:flex">
        <div className="hidden items-center sm:flex">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Link href="/">
            <div>
              <Image src={Logo} alt="Logo" className="sr-only h-14 w-14" />
            </div>
          </Link>

          <Link href="/">
            <div className="not-sr-only">
              <Image src={Logo} alt="Logo" className="h-14 w-14" />
            </div>
          </Link>
        </div>
        <div className="hidden items-center justify-around sm:flex">
          {/* Header Links */}
          <div className="links-wrapper flex space-x-2">
            {headerLinks.map((header, index) => (
              <Link
                href={patternToUrl(header.path, query)}
                key={index}
                className={`${
                  header.disabled
                    ? "pointer-events-none text-contrast-light"
                    : ""
                } 
                
                ${
                  header.path === asPath || header.path === pathname
                    ? "border-tertiary-light text-tertiary-light"
                    : "border-transparent text-contrast-dark hover:border-tertiary-light hover:text-tertiary-light"
                }

                inline-flex items-center border-b-2 px-2`}
              >
                {header.name}
              </Link>
            ))}
          </div>

          {/* Show Divider and Sign in only for Landing Page */}
          {
            <>
              <div className="divider-wrapper">
                <div className="mx-4 h-6 w-px bg-contrast-dark"></div>
              </div>
              <div className="registration-btns-wrapper">
                {/* Sign In Button */}
                {/* todo height 48 width 88 */}
                <SignedOut>
                  <Link href="/sign-in">
                    <Button className=" px-4 py-2 text-base hover:bg-primary-base">
                      Sign In
                    </Button>
                  </Link>
                </SignedOut>

                <SignedIn>
                  <SignOutButton>
                    <Button className=" px-4 py-2 text-base hover:bg-primary-base">
                      Sign Out
                    </Button>
                  </SignOutButton>
                </SignedIn>
              </div>
            </>
          }
        </div>
      </div>

      {/* For Mobile Landing Page */}
      {pathname === "/" ? (
        <div className="sm:hidden">
          <HeaderMobileLanding landingLinks={headerLinks} />
        </div>
      ) : (
        <div className="flex h-14 items-center justify-center bg-primary-light sm:hidden">
          {/* Mobile Header */}
          <p className="text-base font-bold text-arc">
            {mobileHeaders[pathname]}
          </p>
        </div>
      )}
    </header>
  );
};

// export header component
export default Header;
