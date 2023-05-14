import AuthForce from "../auth/AuthForce"

interface PaginaProps {
    externa?: boolean
    children: any
    className?: string
}

export default function Pagina(props: PaginaProps) {
    function render() {
        return (
            <div className={`
                flex flex-col min-h-screen
                bg-gradient-to-r from-zinc-900 via-black to-zinc-from-zinc-900
                ${props.className ?? ''}
            `}>
                {props.children}
            </div>
        )
    }

    return props.externa ? render() : (
        <AuthForce>
            { render() }
        </AuthForce>
    )
}