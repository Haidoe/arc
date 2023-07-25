//eslint-disable-next-line
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import { LoadingPage } from "~/components/Loading";
import MainPageLayout from "~/components/layouts/MainPageLayout";
<<<<<<< HEAD

// landing page components
import Team from "~/components/landingPage/Team";
=======
import Hero from "~/components/landingPage/Hero";
>>>>>>> dev
import Footer from "~/components/landingPage/Footer";

import { api } from "~/utils/api";
import About from "~/components/landingPage/About";
import LandingPageFeature from "~/components/landingPage/Feature";

const Home = () => {
  const { data, isLoading } = api.example.foo.useQuery();

  if (isLoading) return <LoadingPage />;

  return (
    <MainPageLayout>
      <Hero />

      <About />

      <LandingPageFeature />

      {/* 
      <div className="flex flex-1 flex-col items-center justify-center px-4 text-center lg:px-0">
        <h1 className="mb-4 inline-block bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-4xl font-bold uppercase text-transparent">
          {data?.content}
        </h1>

        <p className="mt-8 text-4xl font-bold  tracking-wide text-gray-700">
          Website is under maintenance. 🤕
        </p>

        <p className="text-primary-1 mt-4 text-xl uppercase">
          {`We'll be back soon`}
        </p>
      </div> */}

      
      <Team />

      <Footer />
    </MainPageLayout>
  );
};

export const getServerSideProps = async (ctx) => {
  const { userId } = getAuth(ctx.req);

  const user = userId ? await clerkClient.users.getUser(userId) : undefined;

  //Redirect to home if user is already logged in
  if (user) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {
      userId: userId ? userId : null,
    },
  };
};

export default Home;
