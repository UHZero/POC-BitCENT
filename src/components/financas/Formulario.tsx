import "dayjs/locale/pt-br";
import Transacao from "@/logic/core/financas/Transacao";
import Dinheiro from "@/logic/utils/Dinheiro";
import { Button, Group, Radio, TextInput } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { TipoTransacao } from "@/logic/core/financas/TipoTransacao";
import useFormulario from "@/data/hooks/useFormulario";

interface FormularioProps {
    transacao: Transacao
    cancelar?: () => void
    salvar?: (transacao: Transacao) => void
    excluir?: (transacao: Transacao) => void
}

export default function Formulario(props: FormularioProps) {

    const {data, setFeature} = useFormulario(props.transacao)

    return (
        <div className={`
            flex flex-col border border-zinc-700
            rounded-xl overflow-hidden
        `}>
            <div className="bg-black py-3 px-7 text-zinc-400">Formulário</div>
            <div className="flex flex-col gap-4 p-4 sm:p-7">
                <TextInput
                    label="Descrição"
                    value={data.descricao}
                    onChange={setFeature('descricao')}
                />
                <TextInput
                    label="Valor"
                    value={Dinheiro.formatar(data.valor)}
                    onChange={setFeature('valor', Dinheiro.desformatar)}
                />
                <DatePickerInput
                    label="Data"
                    value={data.data}
                    locale="pt-BR"
                    valueFormat="DD/MM/YYYY"
                    onChange={setFeature('data')}
                />
                <Radio.Group
                    value={data.tipo}
                    onChange={setFeature('tipo')}
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
                    onClick={() => props.salvar?.(data)}
                >
                    Salvar
                </Button>
                <Button
                    className="bg-zinc-500" color="gray"
                    onClick={props.cancelar}
                >
                    Voltar
                </Button>
                <div className="flex-1"></div>
                {props.transacao.id && (
                    <Button
                        className="bg-red-500"
                        color="red"
                        onClick={() => props.excluir?.(props.transacao)}
                    >
                        Excluir
                    </Button>
                )}
            </div>
        </div>
    )
}