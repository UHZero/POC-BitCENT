import Autenticacao from "@/logic/firebase/auth/Autenticacao"
import User from "@/logic/core/user/User"
import { createContext, useState } from "react"

interface AuthProps {
    loading: boolean
    user: User | null
    loginGoogle: () => Promise<User | null>
    logout: () => Promise<void>
}

const AuthContext = createContext<AuthProps>({
    loading: true,
    user: null,
    loginGoogle: async () => null,
    logout: async () => {}
})

export function AuthProvider(props: any) {


    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useState<User | null>(null)

    const auth = new Autenticacao()

    async function loginGoogle() {
        const user = await auth.loginGoogle()
        setUser(user)
        return user
    }

    async function logout() {
        await auth.logout()
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{
            loading,
            user,
            loginGoogle,
            logout
        }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext