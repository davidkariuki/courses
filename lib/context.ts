import { createContext } from "react"

interface ContextProps {
  user: any
  loggedIn: boolean
}

export const UserContext = createContext<ContextProps>({
  user: null,
  loggedIn: false,
})
