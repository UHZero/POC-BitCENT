import useFormulario from "@/data/hooks/useFormulario";
import FormPiece from "../template/FormPiece";
// import fakeUser from "@/data/constants/fakeUser";
import User from "@/logic/core/user/User";
import { TextInput } from "@mantine/core";
import Texto from "@/logic/utils/Texto";
import Cpf from "@/logic/utils/Cpf";
import Telefone from "@/logic/utils/Telefone";
import { useContext, useEffect } from "react";
import AuthContext from "@/data/contexts/AuthContext";

export default function Formularios() {

    const { user, updateUser } = useContext(AuthContext)

    const {data, setFeature, setData} = useFormulario<User>()

    useEffect(() => {
        if(!user) return
        setData(user)
    }, [user])

    async function save() {
        if(!user) return
        await updateUser(data)
    }

    return (
        <div className="flex flex-col gap-5">
            <FormPiece
                title="Seu Nome"
                description="Como você gostaria de ser chamado?"
                footerMSG="O nome deve possuir entre 3 e 80 caracteres, mais que isso já é um texto!"
                canSave={Texto.entre(data.nome, 3, 80)}
                save={save}
            >
                <TextInput
                    value={data.nome}
                    onChange={setFeature('nome')}
                />
            </FormPiece>
            <FormPiece
                title="CPF"
                description="eu CPF é usado internamente pelo sistema."
                footerMSG="Pode relaxar, daqui ele não sai!"
                canSave
                save={save}
            >
                <TextInput
                    value={Cpf.formatar(data.cpf ?? '')}
                    onChange={setFeature('cpf', Cpf.desformatar)}
                />
            </FormPiece>
            <FormPiece
                title="Telefone"
                description="Usado para notificações importantes sobre a sua conta."
                footerMSG="Se receber ligação a cobrar, não foi a gente!"
                canSave
                save={save}
            >
                <TextInput
                    value={Telefone.formatar(data.telefone ?? '')}
                    onChange={setFeature('telefone', Telefone.desformatar)}
                />
            </FormPiece>
        </div>
    )
}