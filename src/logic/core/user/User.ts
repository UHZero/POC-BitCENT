export default interface User {
    id: string
    nome: string
    email: string
    imagemUrl: string | null
    cpf?: string
    telefone?: string
}