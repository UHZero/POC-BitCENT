import "dayjs/locale/pt-br";
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, Group, Radio, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";

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
                <TextInput
                    label="Valor"
                    value={Dinheiro.formatar(props.transacao.valor)}
                />
                <DatePickerInput
                    label="Data"
                    value={props.transacao.data}
                    locale="pt-BR"
                    valueFormat="DD/MM/YYYY"
                />
                <Radio.Group
                    value={props.transacao.tipo}
                    onChange={() => {}}
                >
                    <Group>
                        <Radio value={TipoTransacao.RECEITA} label="Receita" />
                        <Radio value={TipoTransacao.DESPESA} label="Despesa" />
                    </Group>
                </Radio.Group>
            </div>
            <div className="flex px-4 sm:px-7 py-4 gap-3 bg-zinc-800">
                <Button
                    className="bg-green-500" color="green"
                >
                    Salvar
                </Button>
                <Button
                    className="bg-zinc-500" color="gray"
                >
                    Voltar
                </Button>
                <div className="flex-1"></div>
                {props.transacao.id && (
                    <Button
                        className="bg-red-500"
                        color="red"
                    >
                        Excluir
                    </Button>
                )}
            </div>
        </div>
    )
}