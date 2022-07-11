import Image from 'next/image'
import { useRouter } from 'next/router'
import { BsThreeDots } from 'react-icons/bs'

import { TweetProps } from '../Data/Tweet'
import useLikes from '../hooks/useLikes'
import { useUserContext } from '../Providers/UserProvider'
import TweetFooter from './TweetFooter'

const Tweet: React.FC<TweetProps> = (props) => {
  const router = useRouter()
  const userContext = useUserContext()

  const { id, img, name, username, image, text, retweet, favorites } = props
  const { Isliked, setLiked } = useLikes(userContext?.user?.email, props)

  return (
    <div className='flex  flex-col cursor-pointer px-4 my-2 py-2'>
      <div onClick={() => router.push(`/home/${id.toString()}`)} className='flex'>
        <div>
          <Image src={img} width={50} className='rounded-full' height={50} />
        </div>
        <div className='w-[80%] px-4'>
          <div className='flex text-gray-600 items-center mb-1 justify-between'>
            <p className='text-sm text-white'>
              {name}
              <span className='text-gray-600'>{username}</span>
            </p>
            <BsThreeDots size={20} />
          </div>
          <p className='text-md'>{text}</p>
          {image && <Image src={image} width={400} height={280} />}
        </div>
      </div>
      <TweetFooter
        id={id}
        retweet={retweet}
        favorites={favorites}
        setLiked={setLiked}
        isLiked={Isliked}
      />
    </div>
  )
}

export default Tweet
