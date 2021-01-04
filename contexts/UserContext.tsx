import { createContext, FC, useState } from "react"
import type { User } from "../models/user"

export const UserStore: FC = ({ children }) => {
  const [user, setUser] = useState<User>()

  return <UserProvider value={{ user, setUser }}>{children}</UserProvider>
}

interface UserContextProps {
  user: User | undefined
  setUser(user: User): void
}

const initialProps = (): UserContextProps => {
  return {
    user: undefined,
    setUser: (_user: User) => {},
  }
}

const UserContext = createContext<UserContextProps>(initialProps())

export const UserProvider = UserContext.Provider
export const UserConsumer = UserContext.Consumer
export default UserContext
