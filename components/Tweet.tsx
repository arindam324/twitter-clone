import Image from 'next/image'
import { gql, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import { BsThreeDots } from 'react-icons/bs'

import useLikes from '../hooks/useLikes'
import { useUserContext } from '../Providers/UserProvider'
import TweetFooter from './TweetFooter'

export type TweetProps = {
  id: string
  text: string
  image?: string
  Tweetusers: {
    email: string
    displayName: string
    avatarUrl: string
  }
}

const Tweet: React.FC<TweetProps> = (props) => {
  const router = useRouter()
  const userContext = useUserContext()

  // const { id, name, username, image, text, retweet, favorites, userId } = props
  // const { Isliked, setLiked } = useLikes(userContext?.id, props)

  const { id, Tweetusers, text, image } = props

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
          {image && <Image src={image} width={400} height={280} />}
        </div>
      </div>
      {/* <TweetFooter
        id={id}
        // retweet={retweet}
        // favorites={favorites}
        // setLiked={setLiked}
        // isLiked={Isliked}
      /> */}
    </div>
  )
}

export default Tweet
