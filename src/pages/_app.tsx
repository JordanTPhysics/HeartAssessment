import React from 'react'
import '../styles/globals.css'

import dynamic from 'next/dynamic'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function MyApp({ Component, pageProps }: AppProps) {

  return (
    <>
    <Head>
      <title>Healthy Heart</title>
      <meta name="description" content="Self Assessment - Rate yourself against diseases of the Heart!" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <header className='w-screen bg-background-secondary text-center p-4 shadow-xl'>
    <h1 className="lg:text-5xl md:text-3xl text-2xl text-text ">Self Assessment of the Heart</h1>

    </header>
          <Component {...pageProps} />
    </>
  )
}