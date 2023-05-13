import Cabecalho from "@/components/template/Cabecalho";
import Conteudo from "@/components/template/Conteudo";
import Pagina from "@/components/template/Pagina";
import TituloPagina from "@/components/template/TituloPagina";
import Formularios from "@/components/usuarios/Formularios";
import fakeUser from "@/data/constants/fakeUser";
import { IconForms } from "@tabler/icons-react";

export default function CadastroUsuario() {
    const user = fakeUser
	return (
        <Pagina>
            <Cabecalho />
            <Conteudo className="gap-5">
                <TituloPagina 
                    icone={<IconForms />}
                    principal="Dados Cadastrais"
                    secundario={`Informações de ${user.email}`}
                />
                <Formularios />
            </Conteudo>
        </Pagina>
    )
}
