import {
    OrderByDirection,
    QueryConstraint,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getFirestore,
    setDoc,
    orderBy as orderByFirestore,
    query,
    getDocs,
    DocumentSnapshot,
    DocumentData,
    where,
    WhereFilterOp
} from "firebase/firestore"

import Id from "@/logic/core/comum/Id"
import { app } from "../config/app"

export interface Filter {
    att: string
    op: WhereFilterOp
    value: any
}

export default class Collection {

    private _convertFromFirebase(snapshot: DocumentSnapshot<DocumentData>) {
        const entity: any = { ...snapshot.data(), id: snapshot.id }
        if(!entity) return entity
        return Object.keys(entity).reduce((obj: any, att: string) => {
            const value: any = entity[att]
            return { ...obj, [att]: value.toDate?.() ?? value}
        }, {})
    }

    async save (path: string, entity: any, id?: string): Promise<any> {
        const db = getFirestore(app)
        const finalId = id ?? entity.id ?? Id.novo()
        const docRef = doc(db, path, finalId)
        await setDoc(docRef, entity)

        return {
            ...entity,
            id: entity.id ?? finalId
        }
    }

    async delete(path: string, id?: string): Promise<boolean> {
        if(!id) return false
        const db = getFirestore(app)
        const docRef = doc(db, path, id)
        const dbItem = await getDoc(docRef)
        if(!dbItem.exists()) return false
        await deleteDoc(docRef)
        return true
    }

    async show(path: string, orderBy?: string, direction?: OrderByDirection): Promise<any[]>{
        const db = getFirestore(app)
        const refCollection = collection(db, path)
        const filter: QueryConstraint[] = []
        const order = orderBy ? [orderByFirestore(orderBy, direction)] : []
        const inquiry = query(refCollection, ...filter, ...order)
        const result = await getDocs(inquiry)
        return result.docs.map(this._convertFromFirebase) ?? []
    }

    async showById(path: string, id: string): Promise<any> {
        if(!id) return null
        const db = getFirestore(app)
        const docRef = doc(db, path, id)
        const result = await getDoc(docRef)
        return this._convertFromFirebase(result)
    }

    async showWithFilter(path: string, filters: Filter[], orderBy?: string, direction?: OrderByDirection): Promise<any> {
        const db = getFirestore(app)
        const refCollection = collection(db, path)

        const filtersWhere = filters?.map(f => where(f.att, f.op, f.value)) ?? []
        const order = orderBy ? [orderByFirestore(orderBy, direction)] : []

        const inquiry = query(refCollection, ...filtersWhere, ...order)
        const result = await getDocs(inquiry)
        return result.docs.map(this._convertFromFirebase) ?? []
    }
}