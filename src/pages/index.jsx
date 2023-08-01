import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";

// landing page components
import Team from "~/components/landingPage/Team";
import Pricing from "~/components/landingPage/Pricing";
import Hero from "~/components/landingPage/Hero";
import Footer from "~/components/landingPage/Footer";

import About from "~/components/landingPage/About";
import LandingPageFeature from "~/components/landingPage/Feature";
import LandingPageContactSection from "~/components/landingPage/Contact";

const Home = () => {
  const { isSignedIn } = useUser();
  const router = useRouter();

  if (typeof isSignedIn !== "undefined" && isSignedIn) {
    router.push("/home");
  }

  return (
    <>
      <Hero />

      <About />

      <LandingPageFeature />

      <Pricing />

      <Team />

      <LandingPageContactSection />

      <Footer />
    </>
  );
};

export default Home;
