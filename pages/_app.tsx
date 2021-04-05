import React, { useEffect } from "react"
import Head from "next/head"
import { AppProps } from "next/app"
import { ThemeProvider } from "@material-ui/core/styles"
import CssBaseline from "@material-ui/core/CssBaseline"

import theme from "../theme"
import Layout from "../components/Layout"
import TopBar from "../components/Layout/TopBar"
import { AuthProvider } from "../contexts/AuthContext"

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props

  useEffect(() => {
    const jssStyles = document.querySelector("#jss-server-side")
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles)
    }
  }, [])

  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <Layout>
          <Head>
            <title>Mastered</title>
            <meta
              name="viewport"
              content="minimum-scale=1, initial-scale=1, width=device-width"
            />
          </Head>
          <TopBar />
          <CssBaseline />
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </AuthProvider>
  )
}
