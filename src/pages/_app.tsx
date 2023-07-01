import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import store from "~/redux/store";
import Head from "next/head";

import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Arc 🎬 </title>
        <meta name="description" content="🎬 🎬" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
