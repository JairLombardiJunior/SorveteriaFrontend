import { useState, useEffect } from 'react';
import PedidosContext from './PedidosContext';
import Tabela from './Tabela';
import {
    getPedidosAPI, getPedidosPorCodigoAPI,
    deletePedidosPorCodigoAPI, cadastraPedidosAPI
} from '../../../servicos/PedidoServico';
import Formulario from './Formulario';
import { useNavigate } from "react-router-dom";

function Pedidos() {

    let navigate = useNavigate();

    // Nos métodos adicionar um tratamento para caso o token expire redirecione para o login

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        data: "",
        codigo_cliente: "",
        codigo_sorvete: ""
    })
    const [carregando, setCarregando] = useState(true);


    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            data: "",
            codigo_cliente: "",
            codigo_sorvete: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async (objetoOuCodigo) => {
     try {
        let pedido;
        if (typeof objetoOuCodigo === 'object') {
            pedido = objetoOuCodigo;
        } else {
            pedido = await getPedidosPorCodigoAPI(objetoOuCodigo);
        }
        if (pedido.data) {
            const date = new Date(pedido.data);
            pedido.data = !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
        }
        setObjeto(pedido);
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
            let retornoAPI = await cadastraPedidosAPI(objeto, metodo);
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
        recuperaPedidos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPedidos = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getPedidosAPI());
            setCarregando(false);
        } catch (err) {
        // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }

    const remover = async codigo=> {
        if (window.confirm('Deseja remover este objeto?')) {
        try {
            let retornoAPI = await deletePedidosPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaPedidos();
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
                navigate("/login", { replace: true });
            }
        }
    }

    useEffect(() => {
        recuperaPedidos();
    }, []);

    return (
        <PedidosContext.Provider value={
            {
                setAlerta, listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Tabela/>
            <Formulario />
        </PedidosContext.Provider>
   )
}

export default Pedidos;



/*import { useState, useEffect } from 'react';
import PedidosContext from './PedidosContext';
import Tabela from './Tabela';
import {
    getPedidosAPI, getPedidosPorCodigoAPI,
    deletePedidosPorCodigoAPI, cadastraPedidosAPI
} from '../../../servicos/PedidoServico';
import Formulario from './Formulario';

function Pedidos() {

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);

    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);
    const [objeto, setObjeto] = useState({
        codigo: "",
        data: "",
        codigo_cliente: "",
        codigo_servico: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: "",
            data: "",
            codigo_cliente: "",
            codigo_servico: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async (objetoOuCodigo) => {
        let pedido;
        if (typeof objetoOuCodigo === 'object') {
            pedido = objetoOuCodigo;
        } else {
            pedido = await getPedidosPorCodigoAPI(objetoOuCodigo);
        }
        if (pedido.data) {
            const date = new Date(pedido.data);
            pedido.data = !isNaN(date.getTime()) ? date.toISOString().split('T')[0] : "";
        }
        setObjeto(pedido);
        setEditar(true);
        setAlerta({ status: "", message: "" });
        setExibirForm(true);
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraPedidosAPI(objeto, metodo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message });
            setObjeto(retornoAPI.objeto);
            if (!editar) {
                setEditar(true);
            }
        } catch (err) {
            console.error(err.message);
        }
        recuperaPedidos();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaPedidos = async () => {
        setListaObjetos(await getPedidosAPI());
    }

    const remover = async codigo=> {
        if (window.confirm('Deseja remover este objeto?')) {
            let retornoAPI = await deletePedidosPorCodigoAPI(codigo);
            setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
            recuperaPedidos();
        }
    }

    useEffect(() => {
        recuperaPedidos();
    }, []);

    return (
        <PedidosContext.Provider value={
            {
                setAlerta, listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm
            }
        }>
            <Tabela/>
            <Formulario />
        </PedidosContext.Provider>
   )
}

export default Pedidos;*/