import { type AppType } from "next/app";
import { ClerkProvider } from "@clerk/nextjs";
import { Provider } from "react-redux";
import store from "~/redux/store";
import Head from "next/head";
import { Ubuntu } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
        <title>ARC</title>

        <meta
          name="description"
          content="ARC app revolutionizes the tedious process of inputting detailed information for everyday film production, streamlining and simplifying the workflow. It ensures efficiency, accuracy, and real-time updates while offering data visualization for better insights."
        />

        <meta
          name="keywords"
          content="Arc app ca, arc, ARC, ARC app, arc app, arc, arc reporting, production report form, langara college, wmdd, WMDD, production report, production call sheets, call sheets, arc dashboard"
        />

        <link rel="icon" href="/favicon.svg" />
      </Head>

      <style jsx global>{`
        html {
          font-family: ${ubuntu.style.fontFamily};
        }
      `}</style>

      <QueryClientProvider client={new QueryClient()}>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </QueryClientProvider>
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
