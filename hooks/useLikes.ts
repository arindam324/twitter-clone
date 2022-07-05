import { useEffect, useState } from 'react'
import { TweetProps } from '../Data/Tweet'

const useLikes = (userId: string, tweet: TweetProps) => {
  const [Isliked, setLiked] = useState<boolean>(false)

  useEffect(() => {
    if (tweet.favorites.includes(userId)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [tweet])

  return { Isliked, setLiked }
}

export default useLikes
