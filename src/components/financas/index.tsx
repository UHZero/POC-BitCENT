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
import { Button, SegmentedControl } from "@mantine/core";
import { IconLayoutGrid, IconList, IconPlus } from "@tabler/icons-react";
import AuthContext from "@/data/contexts/AuthContext";
import servicos from "@/logic/core";
import useTransacao, { TipoExibicao } from "@/data/hooks/useTransacao";
import CampoMesAno from "../template/CampoMesAno";
import Grade from "./Grade";

export default function Financas() {
    
    const { data, alterarData, transacao, transacoes, selecionar, salvar, excluir, alterarExibicao, tipoExibicao } = useTransacao()

    function controllRender() {
        return (
            <div className="flex justify-between">
                    <CampoMesAno
                        data={data}
                        dataMudou={alterarData}
                    />
                    <div className="flex gap-5">
                        <Button
                            className="bg-blue-500"
                            leftIcon={<IconPlus />}
                            onClick={() => selecionar(emptyTransaction)}
                        >
                            Nova transação
                        </Button>
                        <SegmentedControl
                        data={[
                            { label: <IconList />, value: 'lista' },
                            { label: <IconLayoutGrid />, value: 'grade' }
                        ]}
                        onChange={tipo => alterarExibicao(tipo as TipoExibicao)}
                    />
                    </div>
                </div>
        )
    }

    function renderizarTransacoes() {
        const props = { transacoes, selecionarTransacao: selecionar }
        return tipoExibicao === 'lista' 
            ? <Lista {...props} />
            : <Grade {...props} />
    }


    return (
        <Pagina>
            <Cabecalho />
            <Conteudo className="gap-5">
                {controllRender()}
                {transacao ? (
                    <Formulario 
                        transacao={transacao}
                        salvar={salvar}
                        excluir={excluir}
                        cancelar={() => selecionar(null)} 
                    />
                ) : transacoes.length ? (
                    renderizarTransacoes()
                ) : (
                    <NotFound>
                        Nenhuma transação encontrada
                    </NotFound>
                )}
            </Conteudo>
        </Pagina>
    )
}