import fakeUser from "@/data/constants/fakeUser"

export default function BoasVindas() {
    
    const usuario = fakeUser
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