import { useEffect, lazy, Suspense } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { gql, useQuery, useSubscription } from '@apollo/client'

import FloatingButton from '../../components/FloatingButton'
import Header from '../../components/Header'
import { useAuthenticationStatus } from '@nhost/react'

const Tweet = lazy(() => import('../../components/Tweet'))
import { TweetProps } from '../../components/Tweet'

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
      Likes {
        id
      }
    }
  }
`

const Home: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthenticationStatus()

  // const { loading, data } = useQuery(GET_TWEETS)
  const { data, loading } = useSubscription(GET_TWEETS)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  if (loading) {
    return <div>Is Loading....</div>
  }

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
            {data.posts_tweets.map((item: TweetProps) => (
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
