import { useContext, useState } from "react";
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
import AuthContext from "@/data/contexts/AuthContext";
import servicos from "@/logic/core";
import useTransacao from "@/data/hooks/useTransacao";

export default function Financas() {
    
    const { transacao, transacoes, selecionar, salvar, excluir } = useTransacao()

    return (
        <Pagina>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Button
                    className="bg-blue-500"
                    leftIcon={<IconPlus />}
                    onClick={() => selecionar(emptyTransaction)}
                >
                    Nova transação
                </Button>
                {transacao ? (
                    <Formulario 
                        transacao={transacao}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={() => selecionar(null)} 
                    />
                ) : transacoes.length ? (
                    <Lista
                        transacoes={transacoes}
                        selecionarTransacao={selecionar}
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