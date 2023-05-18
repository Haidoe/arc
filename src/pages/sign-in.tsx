import { SignOutButton } from "@clerk/clerk-react";
import { SignInButton, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { LoadingPage } from "~/components/Loading";

const SignIn = () => {
  const { user, isSignedIn, isLoaded } = useUser();

  if (!isLoaded) return <LoadingPage />;

  console.log(user);

  return (
    <>
      <div className="p-3">
        {isSignedIn ? (
          <div>
            <div>`Your fullname: ${user.fullName ?? "User"}`</div>

            <div className="flex justify-end">
              <Link href="/" className="rounded-md bg-slate-500 p-3 text-white">
                Go back to Home page
              </Link>
            </div>

            <SignOutButton>
              <button className="rounded-md bg-red-300 p-3">
                Sign out here!
              </button>
            </SignOutButton>
          </div>
        ) : (
          <SignInButton>
            <button className="rounded-md bg-red-300 p-3">Sign In here!</button>
          </SignInButton>
        )}
      </div>
    </>
  );
};

export default SignIn;
