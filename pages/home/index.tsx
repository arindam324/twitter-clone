import { useEffect, lazy, Suspense } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { gql, useSubscription } from '@apollo/client'

import FloatingButton from '../../components/FloatingButton'
import Header from '../../components/Header'
import { useAuthenticationStatus } from '@nhost/react'

const Tweet = lazy(() => import('../../components/Tweet'))
import { TweetProps } from '../../components/Tweet'
import { useUserContext } from '../../Providers/UserProvider'

const GET_TWEETS = gql`
  subscription getTweets($userId: uuid!) {
    posts_tweets {
      id
      text
      image
      Tweetusers {
        email
        displayName
        avatarUrl
      }
      Likes(where: { userId: { _eq: $userId } }) {
        tweeId
        userId
      }
    }
  }
`

const Home: NextPage = () => {
  const router = useRouter()
  const { isAuthenticated } = useAuthenticationStatus()

  const userContext = useUserContext()
  // const { loading, data } = useQuery(GET_TWEETS)
  const { data, loading } = useSubscription(GET_TWEETS, {
    variables: {
      userId: userContext?.id,
    },
  })

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  if (loading) {
    return <div>Is Loading....</div>
  } else {
    console.log(data)

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
                <Tweet isLiked={item.Likes !== undefined} key={item.id} {...item} />
              ))}
            </div>
          </Suspense>
          <FloatingButton />
        </main>
      </div>
    )
  }
}

export default Home
