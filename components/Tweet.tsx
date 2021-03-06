import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsThreeDots } from 'react-icons/bs'
import { gql, useQuery, useSubscription } from '@apollo/client'

import TweetFooter from './TweetFooter'
import UseLike from '../hooks/useLikes'
import { useUserContext } from '../Providers/UserProvider'

export type TweetProps = {
  id: string
  text: string
  image?: string
  Tweetusers: {
    email: string
    displayName: string
    avatarUrl: string
  }

  isLiked?: boolean
}

const CHECK_LIKE = gql`
  subscription CheckLike($tweetId: uuid!, $userId: uuid) {
    posts_likes(where: { tweeId: { _eq: $tweetId }, userId: { _eq: $userId } }) {
      id
    }
  }
`

const Like_Count = gql`
  query Like_Count($tweetId: uuid!) {
    posts_likes(where: { tweeId: { _eq: $tweetId } }) {
      likedBy {
        id
      }
    }
  }
`

const Tweet: React.FC<TweetProps> = (props) => {
  const router = useRouter()
  const { id, Tweetusers, text, image, isLiked } = props
  const user = useUserContext()

  // checking if the logged in user liked the tweet
  const { data, loading } = useSubscription(CHECK_LIKE, {
    variables: { tweetId: id, userId: user?.id },
  })

  // fetching likes count
  const { data: likes, loading: loading2 } = useQuery(Like_Count, {
    variables: {
      tweetId: id,
    },
  })

  if (loading) return null
  if (loading2) return null

  return (
    <div className='flex  flex-col cursor-pointer px-4 my-2 py-2'>
      <div onClick={() => router.push(`/home/${id.toString()}`)} className='flex'>
        <div>
          {Tweetusers.avatarUrl && (
            <Image src={Tweetusers.avatarUrl} width={40} className='rounded-full' height={40} />
          )}
        </div>
        <div className='w-[80%] px-4'>
          <div className='flex text-gray-600 items-center mb-1 justify-between'>
            <p className='text-sm text-white'>
              {Tweetusers.displayName}
              <span className='text-gray-600 ml-2'>{Tweetusers.email.split('@')[0]}</span>
            </p>
            <BsThreeDots size={20} />
          </div>
          <p className='text-md'>{text}</p>
          {image && <Image src={image} className='rounded-md mt-2' width={400} height={280} />}
        </div>
      </div>
      <TweetFooter
        id={id}
        favorites={likes.posts_likes.length}
        isLiked={data.posts_likes.length > 0}
      />
    </div>
  )
}

export default Tweet
