import { useState } from "react";
import Cabecalho from "../template/Cabecalho";
import Conteudo from "../template/Conteudo";
import Pagina from "../template/Pagina";
import Transacao, { emptyTransaction } from "@/logic/core/financas/Transacao";
import fakeTransactions from "@/data/constants/fakeTransaction";
import Lista from "./Lista";
import Formulario from "./Formulario";
import NotFound from "../template/NotFound";
import Id from "@/logic/core/comum/Id";
import { Button } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

export default function Financas() {

    const [transacoes, setTransacoes] = useState<Transacao[]>(fakeTransactions)
    const [transacao, settransacao] = useState<Transacao | null>(null)

    function salvar(transacao: Transacao) {
        const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
        setTransacoes([...outrasTransacoes, {
            ...transacao,
            id: transacao.id ?? Id.novo()
        }])
        settransacao(null)
    }
    
    function excluir(transacao: Transacao) {
        const outrasTransacoes = transacoes.filter(t => t.id !== transacao.id)
        setTransacoes(outrasTransacoes)
        settransacao(null)
    }

    return (
        <Pagina>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Button
                    className="bg-blue-500"
                    leftIcon={<IconPlus />}
                    onClick={() => settransacao(emptyTransaction)}
                >
                    Nova transação
                </Button>
                {transacao ? (
                    <Formulario 
                        transacao={transacao}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={() => settransacao(null)} 
                    />
                ) : transacoes.length ? (
                    <Lista
                        transacoes={transacoes}
                        selecionarTransacao={settransacao}
                    />
                ) : (
                    <NotFound>
                        Nenhuma transação encontrada
                    </NotFound>
                )}
            </Conteudo>
        </Pagina>
    )
}