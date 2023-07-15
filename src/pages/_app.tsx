import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
// ** Store
import { store } from "../store";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

// ** React Import
import { useEffect } from "react";
import apiClient from "@/utils/apiClient";
import { useRouter } from "next/router";
import {
  DEFAULT_USER_PARAMS,
  saveAccessToken,
  saveUserData,
} from "@/store/reducers/userSlice";
import Head from "next/head";

// ** NextAuthjs Import
import { signOut } from "next-auth/react";

import modifyError from "@/helper";
import Layout from "@/layout";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  const router = useRouter();

  const getLayout =
    Component.getLayout ?? ((page: any) => <Layout>{page}</Layout>);
  // store
  const { accessToken } = store.getState().user;

  const verifySession = async () => {
    try {
      const res = await apiClient.get("api/v1/auth/verify-session");
      if (!res?.data?.isSessionAuthenticated) {
        store?.dispatch(saveAccessToken(null));
        store?.dispatch(saveUserData(DEFAULT_USER_PARAMS));

        await signOut({
          redirect: true,
        });
      }
    } catch (error) {
      modifyError(error);
      store?.dispatch(saveAccessToken(null));
      store?.dispatch(saveUserData(DEFAULT_USER_PARAMS));

      await signOut({
        redirect: true,
      });
    }
  };
  useEffect(() => {
    if (accessToken) {
      verifySession();
    }
  }, [router.asPath]);

  return (
    <>
      <Head>
        <title>Demo Project</title>
      </Head>
      <SessionProvider session={session}>
        <Provider store={store}>
          <Toaster
            position={"top-right"}
            toastOptions={{
              className: "react-hot-toast ",
              style: {
                zIndex: 1300,
              },
            }}
          />

          {getLayout(<Component {...pageProps} />)}
        </Provider>
      </SessionProvider>
    </>
  );
}
