import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { NhostNextProvider, NhostClient } from '@nhost/nextjs'
import { NhostApolloProvider } from '@nhost/react-apollo'
import UserProvider from '../Providers/UserProvider'

const nhost = new NhostClient({
  subdomain: process.env.NEXT_PUBLIC_NHOST_SUBDOMAIN,
  region: process.env.NEXT_PUBLIC_NHOST_REGION,
})

function MyApp({ Component, pageProps: { nhostSession, ...pageProps } }: AppProps) {
  return (
    <NhostNextProvider nhost={nhost} initial={nhostSession}>
      <NhostApolloProvider nhost={nhost}>
        <UserProvider>
          <Component {...pageProps} />
        </UserProvider>
      </NhostApolloProvider>
    </NhostNextProvider>
  )
}

export default MyApp
