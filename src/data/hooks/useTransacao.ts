import { useContext, useEffect, useState } from "react"
import AuthContext from "../contexts/AuthContext"
import Transacao from "@/logic/core/financas/Transacao"
import servicos from "@/logic/core"

export type TipoExibicao = "lista" | "grade"

export default function useTransacao() {

    const { user } = useContext(AuthContext)

    const [data, setData] = useState<Date>(new Date())
    const [transacoes, setTransacoes] = useState<Transacao[]>([])
    const [transacao, settransacao] = useState<Transacao | null>(null)
    const [tipoExibicao, setTipoExibicao] = useState<TipoExibicao>("lista")

    useEffect(() => {
        searchTransactions()
    }, [data])

    async function searchTransactions() {
        if(!user) return
        const transactions = await servicos.transacao.getByMonth(user, data)
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
        data,
        transacao,
        transacoes,
        tipoExibicao,
        salvar,
        excluir,
        selecionar: settransacao,
        alterarData: setData,
        alterarExibicao: setTipoExibicao
    }
}