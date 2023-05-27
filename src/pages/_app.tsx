import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";

import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Clap Track 🎬 </title>
        <meta name="description" content="💭" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
