import { useState } from "react";
import Cabecalho from "../template/Cabecalho";
import Conteudo from "../template/Conteudo";
import Pagina from "../template/Pagina";
import Transacao from "@/logic/core/financas/Transacao";
import fakeTransactions from "@/data/constants/fakeTransaction";
import Lista from "./Lista";

export default function Financas() {

    const [transacoes, setTransacoes] = useState<Transacao[]>(fakeTransactions)

    return (
        <Pagina>
            <Cabecalho />
            <Conteudo>
                <Lista transacoes={transacoes} />
            </Conteudo>
        </Pagina>
    )
}