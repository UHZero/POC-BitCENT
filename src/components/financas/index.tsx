import { useState } from "react";
import Cabecalho from "../template/Cabecalho";
import Conteudo from "../template/Conteudo";
import Pagina from "../template/Pagina";
import Transacao from "@/logic/core/financas/Transacao";
import fakeTransactions from "@/data/constants/fakeTransaction";
import Lista from "./Lista";
import Formulario from "./Formulario";

export default function Financas() {

    const [transacoes, setTransacoes] = useState<Transacao[]>(fakeTransactions)
    const [transacao, settransacao] = useState<Transacao | null>(null)

    return (
        <Pagina>
            <Cabecalho />
            <Conteudo className="gap-5">
                <Lista transacoes={transacoes} selecionarTransacao={settransacao} />
                {transacao && <Formulario transacao={transacao} />}
            </Conteudo>
        </Pagina>
    )
}