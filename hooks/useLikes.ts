import { gql, useMutation } from '@apollo/client'
import { useEffect } from 'react'
import { useUserContext } from '../Providers/UserProvider'

const CREATE_LIKE = gql`
  mutation CreateLike($id: uuid!, $tweetId: uuid!, $userId: uuid!) {
    insert_posts_likes(objects: { id: $id, tweeId: $tweeId, userId: $userId }) {
      returning {
        id
      }
    }
  }
`

const DELETE_LIKE = gql`
  mutation DELETE_LIKE($id: uuid!, $userId: uuid!) {
    delete_posts_likes(where: { tweetId: { _eq: $id }, userId: { _eq: $userId } }) {
      returning {
        id
      }
    }
  }
`

const UseLike = (id: string, isLiked: boolean) => {
  const user = useUserContext()
  const [deleteLike] = useMutation(DELETE_LIKE)
  const [createLike] = useMutation(CREATE_LIKE)

  const toggleLike = async () => {
    if (isLiked) {
      await deleteLike({ variables: { id } })
    } else {
      await createLike({
        variables: {
          id: id,
          userId: user?.id,
        },
      })
    }
  }

  return { toggleLike }
}

export default UseLike
