// create header component in next.js app
// import Link from next.js
import Link from "next/link";
import { useRouter } from "next/router";

// define headers on different pages
const headersOnPages = {
  "/": [
    {
      name: "Film Production",
      path: "#filmProduction",
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

// read route and show header depending on route
const Header = () => {
  // get route
  const router = useRouter();
  const { pathname } = router;

  const headerLinks = headersOnPages[pathname] || [];

  return (
    <header>
      {/* For Desktop */}
      <div className="hidden items-center justify-between bg-gray-200 px-4 py-3 md:flex">
        <div className="hidden items-center md:flex">
          {/* Logo */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
            alt="Logo"
            className="h-12 w-12"
          />
        </div>
        <div className="hidden items-center md:flex">
          {/* Header Links */}

          {headerLinks.map((header, index) => (
            <Link
              href={header.path}
              key={index}
              className={ header.disabled ? "text-gray-800 hover:text-blue-500 px-2 pointer-events-none" : "text-gray-800 hover:text-blue-500 px-2"}
            >
              {header.name}
            </Link>
          ))}

          {/* Divider */}
          <div className="mx-4 h-6 w-px bg-gray-500"></div>
          {/* Sign In Button */}
          <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
            Sign In
          </button>
        </div>
      </div>

      {/* For Mobile */}
      <div className="flex h-16 items-center justify-center md:hidden">
        {/* Mobile Header */}
        <p className="text-2xl font-bold">ARC</p>
      </div>
    </header>
  );
};


// export header component
export default Header;
