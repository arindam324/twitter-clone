import { useUserContext } from '../Providers/UserProvider'
import { gql, useQuery } from '@apollo/client'

const CHECK_IF_LIKED = gql`
  query MyLikes {
    posts_likes(
      where: {
        tweeId: { _eq: "290a7963-8459-45f6-a716-9d5f22f7ff9f" }
        userId: { _eq: "6ce49770-690e-41c6-bb98-f649dc1ae2dd" }
      }
    ) {
      id
      tweeId
      userId
    }
  }
`

const useLikes = (id: string | undefined) => {
  const user = useUserContext()

  const { data, loading } = useQuery(CHECK_IF_LIKED, {
    variables: {
      tweetId: id,
      userID: user?.id,
    },
  })

  if (id === undefined) return {}
  if (loading) return {}

  return { data }
}

export default useLikes
