import { useSession } from 'next-auth/react'
import { createContext, ReactNode, useContext } from 'react'

type User = {
  email: string
  name: string
  image: string
}

type Session = {
  user: User | undefined
  expires: string
}

const UserContext = createContext<Session | null>(null)

const UserProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useSession()
  //FIXME: fix this type error
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>
}

export default UserProvider

export const useUserContext = () => useContext(UserContext)
