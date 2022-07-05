import { createContext, ReactNode, useContext } from 'react'

type User = {
  id: string
  name: string
  username: string
  avatar: string
}

const UserContext = createContext<User | null>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const initialUser = {
    id: '1',
    name: 'ganj',
    avatar: 'https://i.pravatar.cc/150?img=14',
    username: 'faglanf',
  }

  return <UserContext.Provider value={initialUser}>{children}</UserContext.Provider>
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)
