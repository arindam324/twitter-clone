import { FaRegComment } from 'react-icons/fa'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import { Dispatch, SetStateAction } from 'react'
import fetchComments from '../utils/fetchComments'

const TweetFooter: React.FC<{
  id: string
  retweet: number
  favorites: [string]
  isLiked: boolean
  setLiked: Dispatch<SetStateAction<boolean>>
}> = ({ id, retweet, favorites, isLiked, setLiked }) => {
  const list = fetchComments(id)
  return (
    <div className='flex mt-2  w-[80%] ml-auto items-center justify-between'>
      <div className='flex items-center space-x-2'>
        <FaRegComment size={18} />
        <p>{list.length}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <AiOutlineRetweet size={18} />

        <p>{retweet}</p>
      </div>
      <div onClick={() => setLiked(!isLiked)} className='flex items-center space-x-2'>
        {isLiked ? <AiFillHeart size={'18'} color='red' /> : <AiOutlineHeart size={18} />}
        <p>{favorites.length}</p>
      </div>
      <div>
        <FiShare size={18} />
      </div>
    </div>
  )
}

export default TweetFooter
