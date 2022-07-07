import { ChangeEvent, useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import { BsArrowLeft, BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'

import Avatar from '../../components/Avatar'
import TweetButton from '../../components/TweetButton'
import { TweetData, TweetProps } from '../../Data/Tweet'
import { useUserContext } from '../../Providers/UserProvider'

import useLikes from '../../hooks/useLikes'
import fetchComments from '../../utils/fetchComments'
import fetchUsersById from '../../utils/fetchUsersById'

const Db = {
  findTweet: (id: string): Promise<TweetProps> => {
    const list = TweetData.find((el) => el.id == id.toString())
    if (list) {
      return Promise.resolve(JSON.parse(JSON.stringify(list)))
    } else {
      return Promise.reject('not found suck it ')
    }
  },
}

const Tweet = ({ Mytweet }: { Mytweet: TweetProps }) => {
  const router = useRouter()
  const user = useUserContext()

  const [isDisable, setDisable] = useState<boolean>(true)
  const like = useLikes(user?.id, Mytweet)
  const list = fetchComments(Mytweet.id)

  const OnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDisable(e.target.value.length === 0)
  }

  return (
    <div className='bg-black p-4 text-white w-full min-h-screen'>
      <div className='flex items-center space-x-4'>
        <BsArrowLeft onClick={() => router.back()} size={20} className='cursor-pointer' />
        <p className='font-semibold'>Tweet</p>
      </div>
      <div className='my-4 flex items-center text-gray-600 justify-between'>
        <div className='flex items-center   space-x-4'>
          <Image src={Mytweet.img} width={50} height={50} className='rounded-full' />
          <div>
            <h3 className='text-white font-semibold text-lg'>{Mytweet.name}</h3>
            <p className='text-sm'>{Mytweet.username}</p>
          </div>
        </div>
        <BsThreeDots className='cursor-pointer' size={20} />
      </div>
      <p className='mb-2'>{Mytweet.text}</p>
      {Mytweet.image && (
        <Image src={Mytweet.image} className='rounded-md' width={400} height={250} />
      )}
      <div className='mt-2'>
        <p className='text-sm text-gray-500'>{Mytweet.dateTime}</p>
      </div>
      <div className='border-y flex items-center py-2 mt-2 space-x-5 w-full border-gray-700'>
        <div className='flex justify-between'>3 Retweets</div>
        <div className='flex justify-between'>101 likes</div>
      </div>
      <div className='border-y flex justify-between items-center py-4 mt-2 space-x-5 w-full border-gray-700'>
        <FaRegComment size={20} />
        <AiOutlineRetweet size={20} />
        {like && (
          <>
            <div onClick={() => like.setLiked(!like.Isliked)}>
              {!like.Isliked ? <AiOutlineHeart size={20} /> : <AiFillHeart color='red' size={20} />}
            </div>
            <FiShare size={20} />
          </>
        )}
      </div>

      <div className='flex justify-between items-center py-2 mt-2 space-x-5 w-full border-gray-700'>
        {user && <Avatar src={user?.avatar} size={50} />}
        <input
          onChange={OnInputChange}
          className='bg-black w-full focus:outline-none'
          placeholder='tweet your reply'
        />
        <TweetButton isDisable={isDisable} />
      </div>

      <div className='mt-4'>
        {list.map((item) => (
          <div className='border-y flex items-center space-x-6 border-gray-700 py-2' key={item.id}>
            <Avatar src={fetchUsersById(item.userId)?.avatar} size={30} />
            <p>{item.comment}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

type Params = {
  params: {
    tweetId: string
  }
}

export async function getServerSideProps({ params }: Params) {
  const { tweetId } = params

  const Mytweet = await Db.findTweet(tweetId)

  return {
    props: { Mytweet },
  }
}

export default Tweet
