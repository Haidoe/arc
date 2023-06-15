import { type NextPage } from "next";
import Link from "next/link";

import { LoadingPage } from "~/components/Loading";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading, isError, error } = api.example.bar.useQuery();

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-between">
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center lg:px-0 xl:w-1/2">
          <h1 className="mb-4 inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-4xl font-bold uppercase text-transparent">
            Sample of private API Route
          </h1>

          {isError ? error.message : <p>Data from MongoDB : {data?.content}</p>}

          {isError && (
            <Link href="/sign-in" className="bg-slate-800 p-4 text-white">
              Go to Login page
            </Link>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
