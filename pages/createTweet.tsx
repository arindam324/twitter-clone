import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { ChangeEvent, useState } from 'react'
import { BsArrowLeft } from 'react-icons/bs'

import { gql, useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'

import TweetButton from '../components/TweetButton'
import { useUserContext } from '../Providers/UserProvider'

const CREATE_TWEETS = gql`
  mutation insertTweet {
    insert_posts_tweets(
      objects: {
        id: "a88f302c-5d84-4ca8-a1a8-7762c2a07ea9"
        userId: "6ce49770-690e-41c6-bb98-f649dc1ae2dd"
        text: "hello from nhost "
      }
    ) {
      returning {
        id
        userId
        text
      }
    }
  }
`

const createTweet = () => {
  const [isDisable, setDisable] = useState<boolean>(true)
  const [text, setText] = useState<string>('')

  const router = useRouter()
  const auth = useUserContext()

  const OnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisable(e.target.value.length === 0)
    setText(e.target.value)
  }

  const [createTweet] = useMutation(CREATE_TWEETS)
  const OnSubmit = async () => {
    try {
      await createTweet({
        variables: {
          id: uuid(),
          text: text,
          userId: auth?.id,
        },
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div>
      <Head>
        <title>Create Tweet</title>
        <link rel='icon' href='/twitter.ico' />
      </Head>
      <main className='bg-black w-full min-h-screen p-4'>
        <div className='flex items-center justify-between'>
          <BsArrowLeft size={20} className='cursor-pointer' onClick={() => router.back()} />

          <TweetButton onClick={OnSubmit} isDisable={isDisable} />
        </div>
        <div className='flex space-x-4 mt-4'>
          <div>
            {auth?.avatarUrl && (
              <Image src={auth?.avatarUrl} width={50} height={50} className='rounded-full' />
            )}
          </div>
          <input
            onChange={OnInputChange}
            className='bg-black text-xl  w-full text-white focus:outline-none '
            placeholder="what's happening"
          />
        </div>
      </main>
    </div>
  )
}

export default createTweet
