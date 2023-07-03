import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

// import logo
import Logo from "~/assets/Logo.svg";
import LogoMobile from "~/assets/LogoMobile.svg";
import hamburger from "~/assets/hamburger.svg";
import crossClose from "~/assets/crossClose.svg";

const HeaderMobileLanding = ({ landingLinks }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const links = landingLinks;

  return (
    <header className="flex items-center justify-between bg-primary-light px-4 py-3">
      <div className="flex items-center">
        {/* Logo */}
        <Image src={LogoMobile} alt="Logo" className="h-12 w-12" />
      </div>
      <div className="md:hidden">
        {/* Hamburger Menu */}
        <button
          className="p-2"
          onClick={toggleMenu}
        >
          <Image src={hamburger} alt="hamburger" className="h-6 w-6" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-gray-800 bg-opacity-75">
          <div className="absolute right-0 top-0 h-full w-full overflow-y-auto bg-white">
            <div className="p-4">
              <div className="flex px-4 py-2">
                {/* Logo */}
                <div className="image-wrapper flex-grow">
                  <Image src={Logo} alt="Logo" className="h-16 w-16" />
                </div>
                <div className="close-svg flex flex-shrink-0 items-center">
                  <button
                    className="p-2"
                    onClick={closeMenu}
                  >
                    <Image
                      src={crossClose}
                      alt="crossClose"
                      className="h-6 w-6"
                    />
                  </button>
                </div>
              </div>
              {/* Links */}
              {links.map((link, index) => (
                <Link
                  href={link.path}
                  key={index}
                  className="block px-4 py-2 text-contrast-dark hover:bg-gray-200"
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              {/* Sign in button */}
              <div className="px-4 py-4">
                <button className="rounded-md bg-primary-light px-4 py-2 text-arc hover:bg-primary-dark">
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default HeaderMobileLanding;
