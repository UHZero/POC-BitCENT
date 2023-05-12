import Id from "@/logic/core/comum/Id";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import Transacao from "@/logic/core/financas/Transacao";


const fakeTransactions: Transacao[] = [
    {
        id: Id.novo(),
        descricao: 'Salário',
        data: new Date(2023, 5, 12),
        valor: 3200.00,
        tipo: TipoTransacao.RECEITA
    },
    {
        id: Id.novo(),
        descricao: 'Cartão Santander',
        data: new Date(2023, 5, 10),
        valor: 3987.90,
        tipo: TipoTransacao.DESPESA
    },
    {
        id: Id.novo(),
        descricao: 'SESC - Educação Infantil',
        data: new Date(2023, 5, 10),
        valor: 321.00,
        tipo: TipoTransacao.DESPESA
    },
    {
        id: Id.novo(),
        descricao: 'Óculos Novo',
        data: new Date(2023, 5, 24),
        valor: 182.90,
        tipo: TipoTransacao.DESPESA
    },
    {
        id: Id.novo(),
        descricao: 'SuperMercado',
        data: new Date(2023, 5, 7),
        valor: 925.32,
        tipo: TipoTransacao.DESPESA
    },
    {
        id: Id.novo(),
        descricao: 'Internet',
        data: new Date(2023, 5, 15),
        valor: 99.90,
        tipo: TipoTransacao.DESPESA
    },
    
]