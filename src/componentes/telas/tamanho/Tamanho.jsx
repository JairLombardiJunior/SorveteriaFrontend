import { useState, useEffect } from 'react';
import TamanhoContext from './TamanhoContext';
import {
    getTamanhosAPI, getTamanhoPorCodigoAPI, atualizarTamanhoAPI, 
    cadastraTamanhoAPI, deleteTamanhoPorCodigoAPI, 
} from '../../../servicos/TamanhoServico';
import Tabela from './Tabela';
// importação do componente Tabela
import Formulario from './Formulario'
// importação 
import Carregando from '../../comuns/Carregando';
import { useNavigate } from "react-router-dom";

function Tamanho() {

    let navigate = useNavigate();

    // Nos métodos adicionar um tratamento para caso o token expire redirecione para o login

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // novos estados e métodos
    const [editar, setEditar] = useState(false);
	
    const [exibirForm, setExibirForm] = useState(false);
	
    const [objeto, setObjeto] = useState({
        codigo: "", nome: "", descricao: "", sigla: ""
    })    

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: ""
        });
		setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
        setObjeto(await getTamanhoPorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
		setExibirForm(true);
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraTamanhoAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.log("Erro: " + err);
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
        recuperaTamanhos();
    }

    // Modificação do método que recupera os Tamanhos de sorvete para mudar o valor do estado carregando
    const recuperaTamanhos = async () => {
        try{
        setCarregando(true);
        setListaObjetos(await getTamanhosAPI());
        setCarregando(false);    
        } catch (err) {
        // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
            let retornoAPI = await deleteTamanhoPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaTamanhos();
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
                navigate("/login", { replace: true });
            }
        }
    }
    ///

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    ///
    useEffect(() => {
        recuperaTamanhos();
    }, []);

    return (
        <TamanhoContext.Provider value={
            {
                alerta, setAlerta,
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </TamanhoContext.Provider>
    );
}

export default Tamanho;