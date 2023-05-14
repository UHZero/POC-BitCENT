import Collection from "@/logic/firebase/db/Collection";
import Transacao from "./Transacao";
import User from "../user/User";
import Data from "@/logic/utils/Data";

export default class ServicosTransacao {
    private _collection = new Collection()

    async save(transaction: Transacao, user: User) {
        return this._collection.save(
            `financas/${user.email}/transacoes`,
            transaction
        )
    }

    async get(user: User) {
        const path = `financas/${user.email}/transacoes`
        return await this._collection.show(path, 'data', 'desc')
    }

    async delete (transaction: Transacao, user: User) {
        return this._collection.delete(
            `financas/${user.email}/transacoes`,
            transaction.id
        )
    }

    async getByMonth(user: User, data: Date) {
        const path = `financas/${user.email}/transacoes`
        return await this._collection.showWithFilter(path, [
            { att: "data", op: ">=", value: Data.primeiroDia(data) },
            { att: "data", op: "<=", value: Data.ultimoDia(data) },
        ])
    }
}