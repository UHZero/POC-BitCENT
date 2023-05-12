import Transacao from "@/logic/core/financas/Transacao";
import { TextInput } from "@mantine/core";

interface FormularioProps {
    transacao: Transacao
}

export default function Formulario(props: FormularioProps) {
    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            <div className="bg-black py-3 px-7 text-zinc-400">Formulário</div>
            <div className="flex flex-col gap-4 p-4 sm:p-7">
                <TextInput
                    label="Descrição"
                    value={props.transacao.descricao}
                />
            </div>
        </div>
    )
}