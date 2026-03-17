import "@/styles/globals.css";

import Layout from "@/components/Layout";
import ErrorBoundary from "@/components/ErrorBoundary";

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </Layout>
  );
}
