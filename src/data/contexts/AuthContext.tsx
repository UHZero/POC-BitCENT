import Autenticacao from "@/logic/firebase/auth/Autenticacao"
import User from "@/logic/core/user/User"
import { createContext, useEffect, useState } from "react"
import servicos from "@/logic/core"

interface AuthProps {
    loading: boolean
    user: User | null
    loginGoogle: () => Promise<User | null>
    logout: () => Promise<void>
    updateUser: (newUser: User) => Promise<void>
}

const AuthContext = createContext<AuthProps>({
    loading: true,
    user: null,
    loginGoogle: async () => null,
    logout: async () => {},
    updateUser: async () => {}
})

export function AuthProvider(props: any) {


    const [loading, setLoading] = useState<boolean>(true)
    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        const exit = servicos.usuario.authWatch((u) => {
            setUser(u)
            setLoading(false)
        })
        return () => exit()
    }, [])

    async function updateUser(newUser: User) {
        if(user && user.email !== newUser.email) return logout()
        if(user && newUser && user.email === newUser.email) {
            await servicos.usuario.save(newUser)
            setUser(newUser)
        } 
    }

    async function loginGoogle() {
        const user = await servicos.usuario.loginGoogle()
        setUser(user)
        return user
    }

    async function logout() {
        await servicos.usuario.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            loading,
            user,
            loginGoogle,
            logout,
            updateUser
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext