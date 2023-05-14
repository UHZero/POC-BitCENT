import User from "@/logic/core/user/User";

import { Auth, GoogleAuthProvider, getAuth, signInWithPopup, signOut, User as FirebaseUser } from 'firebase/auth'
import { app } from "../config/app";

export default class Autenticacao {
    private _auth: Auth

    constructor() {
        this._auth = getAuth(app)
    }

    async loginGoogle(): Promise<User | null> {
        const resp = await signInWithPopup(this._auth, new GoogleAuthProvider())
        return this.userToUser(resp.user)
    }

    logout(): Promise<void> {
        return signOut(this._auth)
    }

    private userToUser(firebaseUser: FirebaseUser | null): User | null {
        if(!firebaseUser?.email) return null
        const altName = firebaseUser.email!.split('@')[0]

        return {
            id: firebaseUser.uid,
            nome: firebaseUser.displayName ?? altName,
            email: firebaseUser.email,
            imagemUrl: firebaseUser.photoURL
        }
    }
}