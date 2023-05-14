import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import Transacao from "@/logic/core/financas/Transacao"
import Id from "@/logic/core/comum/Id"
import servicos from "@/logic/core"

export default function useTransacao() {

    const { user } = useContext(AuthContext)

    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacao, settransacao] = useState<Transacao | null>(null)

    useEffect(() => {
        searchTransactions()
    }, [])

    async function searchTransactions() {
        if(!user) return
        const transactions = await servicos.transacao.get(user)
        setTransacoes(transactions)
    }

    async function salvar(transacao: Transacao) {
        if(!user) return
        await servicos.transacao.save(transacao, user)
        settransacao(null)
        await searchTransactions()
    }
    
    async function excluir(transacao: Transacao) {
        if(!user) return
        await servicos.transacao.delete(transacao, user)
        settransacao(null)
        await searchTransactions()
    }

    return {
        transacao,
        transacoes,
        salvar,
        excluir,
        selecionar: settransacao
    }
}