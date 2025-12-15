import { useState, useEffect } from 'react';
import ClienteContext from './ClienteContext';
import {
    getClientesAPI, getClientePorCodigoAPI,
    deleteClientePorCodigoAPI, cadastraClienteAPI
} from '../../../servicos/ClienteServico';
import Tabela from './Tabela';
// importação do componente Tabela
import Formulario from './Formulario'
// importação 
import Carregando from '../../comuns/Carregando';

function Cliente() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    

    const recuperaClientes = async () => {
        setCarregando(true);
        setListaObjetos(await getClientesAPI());
        setCarregando(false);    
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteClientePorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaClientes();
        }
    }
    ///

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
        setObjeto(await getClientePorCodigoAPI(codigo))
        setEditar(true);
        setAlerta({ status: "", message: "" });
		setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraClienteAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaClientes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    ///
    useEffect(() => {
        recuperaClientes();
    }, []);

    return (
        <ClienteContext.Provider value={
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
        </ClienteContext.Provider>
    );
}

export default Cliente;




/*import { useState, useEffect } from 'react';
import ClientesContext from './ClientesContext';
import Tabela from './Tabela';
import {
    getClientesAPI, getClientesPorCodigoAPI,
    deleteClientesPorCodigoAPI, cadastraClientesAPI
} from '../../../servicos/ClienteServico';
import Formulario from './Formulario';

function Clientes() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        nome: "",
        email: "",
        telefone: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            nome: "",
            email: "",
            telefone: ""
        });
        setExibirForm(true);
    }

     
   const editarObjeto = async (objetoOuCodigo) => {
        if (typeof objetoOuCodigo === 'object') {
            setObjeto(objetoOuCodigo);
        } else {
            setObjeto(await getClientesPorCodigoAPI(objetoOuCodigo));
        }
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }
    
    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraClientesAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaClientes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaClientes = async () => {
        setListaObjetos(await getClientesAPI());
    }

    const remover = async codigo => {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deleteClientesPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaClientes();
        }
    }

    useEffect(() => {
        recuperaClientes();
    }, []);

    return (
        <ClientesContext.Provider value={
            {
                setAlerta, listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Tabela />
            <Formulario />
        </ClientesContext.Provider>
    )

}

export default Clientes;*/