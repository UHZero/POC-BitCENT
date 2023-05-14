import { UserWatch, WatchExit } from './../../firebase/auth/Autenticacao';
import User from "@/logic/core/user/User";
import Autenticacao from "@/logic/firebase/auth/Autenticacao";
import Collection from "@/logic/firebase/db/Collection";

export default class ServicosUsuario {
    private _auth = new Autenticacao()
    private _collection = new Collection()

    authWatch(observer: UserWatch): WatchExit {
        return this._auth.watch(async user => {
            observer(user ? {
                ...user,
                ...await this.inquiry(user.email)
            } : null)
        })
    }

    async loginGoogle(): Promise<User | null> {
        const user = await this._auth.loginGoogle()
        if(!user) return null

        let userDB = await this.inquiry(user.email)
        if(!userDB) userDB = await this.save(user)

        return { ...user, ...userDB}
    }

    async save(user: User) {
        return await this._collection.save(
            'usuarios',
            user,
            user.email
        )
    }

    async inquiry(email: string) {
        return await this._collection.showById(
            'usuarios',
            email
        )
    }

    logout(): Promise<void> {
        return this._auth.logout()
    }

}