import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { v4 as uuid } from 'uuid'
import { FaRegComment } from 'react-icons/fa'
import { AiOutlineRetweet, AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { FiShare } from 'react-icons/fi'
import fetchComments from '../utils/fetchComments'
import { useUserContext } from '../Providers/UserProvider'
import useLikes from '../hooks/useLikes'

const CREATE_LIKE = gql`
  mutation createLikes($id: uuid!, $userId: uuid!, $tweeId: uuid!) {
    insert_posts_likes(objects: { id: $id, tweeId: $tweeId, userId: $userId }) {
      returning {
        likedBy {
          displayName
          id
        }
      }
    }
  }
`

const TweetFooter: React.FC<{
  id: string
  retweet?: number
  favorites?: number
  isLiked: boolean
}> = ({ id, retweet, favorites, isLiked }) => {
  const list = fetchComments(id)

  const [IsLiked, setLiked] = useState<boolean | undefined>(isLiked)

  const user = useUserContext()

  const [mutateLike, { loading }] = useMutation(CREATE_LIKE)

  const setLike = async () => {
    setLiked(!IsLiked)
    try {
      await mutateLike({
        variables: {
          id: uuid(),
          tweeId: id,
          userId: user?.id,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }

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

      <div onClick={setLike} className='flex cursor-pointer text-white items-center space-x-2'>
        {IsLiked ? <AiFillHeart size={'18'} color='red' /> : <AiOutlineHeart size={18} />}
        <p>{favorites}</p>
      </div>

      <div>
        <FiShare size={18} />
      </div>
    </div>
  )
}

export default TweetFooter
