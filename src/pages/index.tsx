import { type NextPage } from "next";

import { LoadingPage } from "~/components/Loading";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const { data, isLoading } = api.example.foo.useQuery();

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <main className="flex h-screen w-full flex-col items-center justify-between">
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center lg:px-0 xl:w-1/2">
          <h1 className="mb-4 inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-4xl font-bold uppercase text-transparent">
            {data?.content}
          </h1>

          <p className="mt-8 text-4xl font-bold  tracking-wide text-gray-700">
            Website is under maintenance. 🤕
          </p>

          <p className="mt-4 text-xl uppercase text-primary-1">
            {`We'll be back soon`}
          </p>
        </div>
      </main>
    </>
  );
};

export default Home;
