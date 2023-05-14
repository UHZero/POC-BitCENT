// import fakeUser from "@/data/constants/fakeUser"

import AuthContext from "@/data/contexts/AuthContext"
import { useContext } from "react"

export default function BoasVindas() {

    const { user } = useContext(AuthContext)
    
    const usuario = user
    function renderizarNome() {
        return (
            <span className="hidden sm:inline">
                {usuario?.nome?.split(' ')[0]}
            </span>
        )
    }
    
    return (
        <div className="text-3xl font-black">
            Olá {renderizarNome()} 👋
        </div>
    )
}