import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NhostNextProvider, NhostClient } from '@nhost/nextjs'
import { SessionProvider } from 'next-auth/react'
import UserProvider from '../Providers/UserProvider'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

function MyApp({ Component, pageProps: { session, nhostSession, ...pageProps } }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={nhostSession}>
      <SessionProvider session={session}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </SessionProvider>
    </NhostNextProvider>
  )
}

export default MyApp
