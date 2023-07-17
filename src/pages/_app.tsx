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

        <meta
          name="description"
          content="ARC app revolutionizes the tedious process of inputting detailed information for everyday film production, streamlining and simplifying the workflow. It ensures efficiency, accuracy, and real-time updates while offering data visualization for better insights."
        />

        <meta
          name="keywords"
          content="Arc, arc, ARC, ARC app, arc app, arc, arc reporting, arc form, production report form, langara college, wmdd"
        />
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
