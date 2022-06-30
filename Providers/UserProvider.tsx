import { createContext, ReactNode, useContext } from "react";

type User = {
  id: string;
  name: string;
  username: string;
  avatar: string;
};

const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: ReactNode }) => {
  return <UserContext.Provider value={null}>{children}</UserContext.Provider>;
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);
