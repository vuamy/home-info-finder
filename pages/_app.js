 import React from "react";
  import App from "next/app";
  import Head from "next/head";

  import "../styles/global.css"
  import "../styles/tailwind.css"

  export default class MyApp extends App {
    
    static async getInitialProps({ Component, router, ctx }) {
      let pageProps = {};

      if (Component.getInitialProps) {
        pageProps = await Component.getInitialProps(ctx);
      }

      return { pageProps };
    }
    render() {
      const { Component, pageProps } = this.props;

      const Layout = Component.layout || (({ children }) => <>{children}</>);

      return (
        <React.Fragment>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <title>Home Finder</title>
          </Head>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </React.Fragment>
      );
    }
  }