import { useUserData } from '@nhost/react'
import { createContext, ReactNode, useContext } from 'react'

type User = {
  id: string
  displayName: string
  avatarUrl: string
}

const UserContext = createContext<User | null>(null)

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const user = useUserData()
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)
