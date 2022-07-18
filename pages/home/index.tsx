import Head from 'next/head'
import { NextPage } from 'next'
import { useEffect, lazy, Suspense } from 'react'
import { useRouter } from 'next/router'
import { useAuthenticationStatus } from '@nhost/react'
import { gql, useSubscription } from '@apollo/client'

import FloatingButton from '../../components/FloatingButton'
import Header from '../../components/Header'
import { TweetProps } from '../../components/Tweet'
const Tweet = lazy(() => import('../../components/Tweet'))

const GET_TWEETS = gql`
  subscription getTweets {
    posts_tweets {
      id
      text
      image
      Tweetusers {
        email
        displayName
        avatarUrl
      }
    }
  }
`

const Home: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthenticationStatus()
  const { data, loading } = useSubscription(GET_TWEETS)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  if (loading) return <div>Loading...</div>

  return (
    <div className='w-full min-h-screen'>
      <Head>
        <title>Home / Twitter</title>
        <link rel='icon' href='/twitter.ico' />
      </Head>
      <main className='bg-black relative w-full text-white min-h-screen'>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          <div className='divide-y divide-gray-500 '>
            {data.posts_tweets?.map((item: TweetProps) => (
              <Tweet key={item.id} {...item} />
            ))}
          </div>
        </Suspense>
        <FloatingButton />
      </main>
    </div>
  )
}

export default Home
