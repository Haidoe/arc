// import modules from next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// import components
import HeaderMobileLanding from "~/components/global/HeaderMobileLanding.jsx";

// import logo
import Logo from "~/assets/icons/Logo.svg";

// define headers on different pages
const linksOnHeader = {
  "/": [
    {
      name: "Film Production",
      path: "#filmProduction",
      disabled: true,
    },
    {
      name: "Features",
      path: "#features",
    },
    {
      name: "About",
      path: "#about",
    },
    {
      name: "Team",
      path: "#team",
    },
    {
      name: "Contact",
      path: "#contact",
    },
  ],
  "/production": [
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
      disabled: true,
    },
  ],
  "/productionReport": [
    {
      name: "Production",
      path: "/production",
      disabled: false,
    },
    {
      name: "Production Report",
      path: "/productionReport",
      disabled: false,
    },
    {
      name: "Dashboard",
      path: "/dashboard",
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
  "/production": "Production",
  "/productionReport": "Production Report",
  "/dashboard": "Dashboard",
  "/kaos/testDailyReports": "Production Report",
}

// read route and show header depending on route
const Header = () => {
  // get route
  const router = useRouter();
  const { pathname } = router;

  const headerLinks = linksOnHeader[pathname] || [];

  return (
    <header>
      {/* For Desktop */}
      <div className="hidden items-center justify-between bg-base px-4 py-3 sm:flex">
        <div className="hidden items-center sm:flex">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <Image src={Logo} alt="Logo" className="h-14 w-14" />
        </div>
        <div className="hidden items-center sm:flex">
          {/* Header Links */}

          {headerLinks.map((header, index) => (
            <Link
              href={header.path}
              key={index}
              className={
                header.disabled
                  ? "pointer-events-none px-2 text-contrast-light"
                  : "px-2 text-contrast-dark hover:text-tertiary-base"
              }
            >
              {header.name}
            </Link>
          ))}

          {/* Show Divider and Sign in only for Landing Page */}
          {pathname === "/" && (<div>
            {/* Divider */}
            <div className="mx-4 h-6 w-px bg-contrast-dark"></div>
            {/* Sign In Button */}
            {/* todo height 48 width 88 */}
            <button className="rounded-md bg-primary-light px-4 py-2 text-white hover:bg-primary-base">
              Sign In
            </button>
          </div>)}
        </div>
      </div>

      {/* For Mobile Landing Page */}

      {pathname === "/" ? (
        <div className="sm:hidden">
          <HeaderMobileLanding landingLinks={headerLinks} />
        </div>
      ) : (
        <div className="flex h-14 bg-primary-light items-center justify-center sm:hidden">
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
