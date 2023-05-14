import AuthContext from "@/data/contexts/AuthContext"
import { useRouter } from "next/router"
import { useContext } from "react"
import Loading from "../template/Loading"

interface AuthForceProps {
    children: any
}

export default function AuthForce(props: AuthForceProps) {
    const router = useRouter()
    const { user, loading } = useContext(AuthContext)

    if(loading) {
        return <Loading />
    } else if (user?.email) {
        return props.children
    } else {
        router.push('/')
        return <Loading />
    }
}