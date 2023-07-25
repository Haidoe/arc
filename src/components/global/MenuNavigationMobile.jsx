import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

// pattern is a string
// dynamicPath is an object -> key being the dynamic path and value being the value of the dynamic path
const patternToUrl = (pattern, dynamicPath) => {
  let url = pattern;
  for (const [key, value] of Object.entries(dynamicPath)) {
    url = url.replace(`[${key}]`, value);
  }
  return url;
};

const MenuNavigationMobile = () => {
  // get route
  const router = useRouter();
  const { pathname, query } = router;

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

  const urls = [
    {
      name: "Home",
      path: "/home",
      img: "/images/icons/menu_production.svg",
      imgAlt: "Production Icon",
    },
    {
      name: "Report",
      path: "/production/[productionId]/report",
      img: "/images/icons/menu_report.svg",
      imgAlt: "Report Icon",
    },
    {
      name: "Dashboard",
      path: "/production/[productionId]/dashboard",
      img: "/images/icons/menu_dashboard.svg",
      imgAlt: "Dashboard Icon",
    },
    {
      name: "Account",
      path: "/account",
      img: "",
      imgAlt: "",
    },
  ];

  const allowedUrls = [
    "/home",
    "/production/[productionId]/dashboard",
    "/production/[productionId]/report",
  ];

  if (!allowedUrls.includes(pathname)) {
    return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0  bg-arc lg:hidden">
      <div className="flex h-[75px]">
        {urls.map((url, index) => {
          if (url.name === "Account") {
            return (
              <div
                className="flex flex-1 items-center justify-center border-t-[1px] border-contrast-light pt-[3px]"
                key={index}
              >
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="h-[24px] w-[24px]">
                    <UserButton />
                  </div>

                  <span className="mt-1 text-xs">{url.name}</span>
                </div>
              </div>
            );
          }

          return (
            <Link
              href={patternToUrl(url.path, query)}
              key={index}
              className={`poin flex flex-1 items-center justify-center ${
                isActivePage() === "Home"
                  ? "pointer-events-none text-contrast-light"
                  : ""
              }   ${
                isActivePage() === url.name
                  ? "border-t-[4px] border-pink-500"
                  : "border-t-[1px] border-contrast-light pt-[3px]"
              }`}
            >
              <div className="flex flex-col items-center justify-center gap-2">
                <Image width={24} height={24} src={url.img} alt={url.imgAlt} />

                <span
                  className={` text-xs ${
                    isActivePage() === url.name
                      ? "font-bold text-primary-light"
                      : ""
                  }`}
                >
                  {url.name === "Home" ? "Production" : url.name}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default MenuNavigationMobile;
