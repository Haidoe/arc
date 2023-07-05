import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import store from "~/redux/store";
import Head from "next/head";
import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

import { api } from "~/utils/api";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider {...pageProps}>
      <Head>
        <title>Arc 🎬 </title>
        <meta name="description" content="🎬 🎬" />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${ubuntu.style.fontFamily};
        }
      `}</style>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
