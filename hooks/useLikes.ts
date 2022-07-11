import { useEffect, useState } from 'react'
import { TweetProps } from '../Data/Tweet'

const useLikes = (email: string | undefined, tweet: TweetProps) => {
  const [Isliked, setLiked] = useState<boolean>(false)

  if (email === undefined) return {}

  useEffect(() => {
    if (tweet.favorites.includes(email)) {
      setLiked(true)
    } else {
      setLiked(false)
    }
  }, [tweet, email])

  return { Isliked, setLiked }
}

export default useLikes
