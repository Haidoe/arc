import type { NextPage } from "next";
import { SignInButton, SignedOut, useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/clerk-react";

const PrefetchUser: NextPage<{ userId: string | null }> = ({ userId }) => {
  console.log("@@@@@@@@@@@@@@@@@@@@@@@");
  console.log(userId);

  return (
    <>
      <nav className="bg-gray-800">
        <ul className="p-2 text-center text-white md:flex">
          <li className="cursor-pointer">
            <a
              className="block p-4 hover:bg-slate-200 hover:text-gray-800"
              href="#"
            >
              {/* {isSignedIn ? <SignOutButton /> : <SignInButton mode="modal" />} */}
            </a>
          </li>

          <li className="cursor-pointer">
            <a
              className="block p-4 hover:bg-slate-200 hover:text-gray-800"
              href="#"
            >
              Marker
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

import {
  clerkClient,
  getAuth,
  buildClerkProps,
  User,
} from "@clerk/nextjs/server";
import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  // WITH USER INFO
  // const user = userId ? await clerkClient.users.getUser(userId) : undefined;
  // return {
  //   props: {
  //     foo: {
  //       ...buildClerkProps(ctx.req, { user }),
  //     },
  //   },
  // };

  return {
    props: {
      userId: userId,
    },
  };
};

export default PrefetchUser;
