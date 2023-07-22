// import modules from next.js
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// import logo
import MenuProduction from "~/assets/icons/menu_production.svg";
import MenuDashboard from "~/assets/icons/menu_dashboard.svg";
import MenuReport from "~/assets/icons/menu_report.svg";
import MenuAccount from "~/assets/icons/menu_account.svg";

// import { SignOutButton, SignedIn, SignedOut } from "@clerk/clerk-react";
// import Button from "../Button";

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
const MenuNavigationMobile = () => {
  // get route
  const router = useRouter();
  const { pathname, asPath, query } = router;

  const isActivePage = () => {
    if (pathname === "/home") {
      return "Home";
    } else if (pathname === "/production/[productionId]/report") {
      return "Report";
    } else if (pathname === "/production/[productionId]/dashboard") {
      return "Dashboard";
    } else {
      return "Account";
    }
  };

  const disabledOnPaths = ["/", "/sign-in"];

  return (
    <>
      {!disabledOnPaths.includes(pathname) && (
        <div className="overflow-x-hidden">
          <div className="fixed bottom-0 left-0 flex  w-full items-center justify-between gap-3 border-t-[1px] border-contrast-light bg-arc px-4 sm:gap-[4rem] md:gap-[7rem] lg:hidden">
            {/* Production Tab */}
            <Link href="/home" className="flex-1">
              <div
                className={`flex flex-col items-center gap-2 py-4 ${
                  isActivePage() === "Home"
                    ? "border-t-[6px] border-pink-500"
                    : ""
                }`}
              >
                <Image src={MenuProduction} alt="Logo" className="h-8 w-8" />
                <span className="text-sm font-normal">Production</span>
              </div>
            </Link>
            {/* Report Tab */}
            <Link
              href={patternToUrl("/production/[productionId]/report", query)}
              className={`flex-1 ${
                pathname == "/home"
                  ? "pointer-events-none text-contrast-light"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col items-center gap-2 py-4 ${
                  isActivePage() === "Report"
                    ? "border-t-[6px] border-pink-500"
                    : ""
                }`}
              >
                <Image src={MenuReport} alt="Logo" className="h-8 w-8" />
                <span className="text-sm font-normal">Report</span>
              </div>
            </Link>
            {/* Dashboard Tab */}
            <Link
              href={patternToUrl("/production/[productionId]/dashboard", query)}
              className={`flex-1 ${
                pathname == "/home"
                  ? "pointer-events-none text-contrast-light"
                  : ""
              }`}
            >
              <div
                className={`flex flex-col items-center gap-2 py-4 ${
                  isActivePage() === "Dashboard"
                    ? "border-t-[6px] border-pink-500"
                    : ""
                }`}
              >
                <Image src={MenuDashboard} alt="Logo" className="h-8 w-8" />
                <span className="text-sm font-normal">Dashboard</span>
              </div>
            </Link>
            {/* Account Tab */}
            <Link href="#" className="flex-1">
              <div
                className={`flex flex-col items-center gap-2 py-4 ${
                  isActivePage() === "Account"
                    ? "border-t-[6px] border-pink-500"
                    : ""
                }`}
              >
                <Image src={MenuAccount} alt="Logo" className="h-8 w-8" />
                <span className="text-sm font-normal">Account</span>
              </div>
            </Link>
          </div>
          {/* Add the rest of your content here */}
        </div>
      )}
    </>
  );
};

// export header component
export default MenuNavigationMobile;
