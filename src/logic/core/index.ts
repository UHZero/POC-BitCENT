import ServicosTransacao from "./financas/ServicosTransacao";

class Servicos {
    get transacao() {return new ServicosTransacao()}
}

const servicos = new Servicos()
export default servicos