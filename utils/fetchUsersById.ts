import { Users } from '../Data/Users'

const fetchUserById = (id: string) => {
  return Users.find((el) => el.id == id)
}

export default fetchUserById
