import ServicosTransacao from "./financas/ServicosTransacao";
import ServicosUsuario from "./user/ServicosUsuario";

class Servicos {
    get transacao() {return new ServicosTransacao()}
    get usuario() { return new ServicosUsuario() }
}

const servicos = new Servicos()
export default servicos