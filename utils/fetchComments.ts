import { Comments } from '../Data/Comments'

const fetchComments = (id: string) => {
  return Comments.filter((el) => el.postId == id)
}

export default fetchComments
