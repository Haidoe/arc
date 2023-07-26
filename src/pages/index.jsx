//eslint-disable-next-line
import { clerkClient, getAuth } from "@clerk/nextjs/server";
import MainPageLayout from "~/components/layouts/MainPageLayout";

// landing page components
import Team from "~/components/landingPage/Team";
import Pricing from "~/components/landingPage/Pricing";
import Hero from "~/components/landingPage/Hero";
import Footer from "~/components/landingPage/Footer";

import About from "~/components/landingPage/About";
import LandingPageFeature from "~/components/landingPage/Feature";

const Home = () => {
  return (
    <MainPageLayout>
      <Hero />

      <About />

      <LandingPageFeature />

      <Pricing />

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
