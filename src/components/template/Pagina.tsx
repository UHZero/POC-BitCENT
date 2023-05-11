interface PaginaProps {
    externa?: boolean
    children: any
    className?: string
}

export default function Pagina(props: PaginaProps) {
    return (
        <div className={`
            flex flex-col min-h-screen
            bg-gradient-to-r from-lime-900 via-lime-700 to-lime-900
            ${props.className ?? ''}
        `}>
            {props.children}
        </div>
    )
}