import { useContext, createContext, useState } from "react"

const NotesContext = createContext()
const UserContext = createContext()

export const useNotes = () => {
    return useContext(NotesContext)
}
export const useUser = () => {
    return useContext(UserContext)
}

const NotesProvider = ({ children }) => {
    const [notes, setNotes] = useState()
    return (
        <NotesContext.Provider value={[notes, setNotes]}>
            {children}
        </NotesContext.Provider>)
}
const UserProvider = ({ children }) => {
    const [user, setUser] = useState()

    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>)
}

export const AppContext = ({ children }) => {
    return (
        <UserProvider>
            <NotesProvider>
                {children}
            </NotesProvider>
        </UserProvider>
    )
}
