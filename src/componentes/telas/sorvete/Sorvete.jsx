import React, { useState, useEffect } from 'react';
import SorveteContext from './SorveteContext';
import { getTamanhosAPI } from '../../../servicos/TamanhoServico';
import {
    getSorvetesAPI, getSorvetePorCodigoAPI,
    atualizarSorveteAPI, deleteSorvetePorCodigoAPI, cadastraSorveteAPI
}
    from '../../../servicos/SorveteServico'
import Tabela from './Tabela';
import Formulario from './Formulario';
import Carregando from '../../comuns/Carregando';
// importação
import WithAuth from "../../../Seguranca/WithAuth.jsx";
import { useNavigate } from "react-router-dom";


function Sorvete() {

    let navigate = useNavigate();

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [listaTamanhos, setListaTamanhos] = useState([]);
    const [carregando, setCarregando] = useState(true);



    const [editar, setEditar] = useState(false);
    const [exibirForm, setExibirForm] = useState(false);

    const [objeto, setObjeto] = useState({
        codigo: 0,
        nome: "",
        descricao: "",
        quantidade_estoque: "",
        valor: "",
        ativo: "",
        data_cadastro: new Date().toISOString().slice(0, 10),
        tamanho: ""
    })

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            codigo: 0,
            nome: "",
            descricao: "",
            quantidade_estoque: "",
            valor: "",
            ativo: "",
            data_cadastro: new Date().toISOString().slice(0, 10),
            tamanho: ""
        });
        setExibirForm(true);
    }

    const editarObjeto = async codigo => {
        try {
            setObjeto(await getSorvetePorCodigoAPI(codigo))
            setEditar(true);
            setAlerta({ status: "", message: "" });
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        } setExibirForm(true);
    }


    const acaoCadastrar = async e => {
        e.preventDefault();
        const metodo = editar ? "PUT" : "POST";
        try {
            let retornoAPI = await cadastraSorveteAPI(objeto, metodo);
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
        recuperaSorvetes();
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const recuperaSorvetes = async () => {
        try {
            setCarregando(true);
            setListaObjetos(await getSorvetesAPI());
            setCarregando(false);
        } catch (err) {
            // tratamento para ir para a tela de login em caso de erro
            navigate("/login", { replace: true });
        }
    }
    const recuperaTamanhos = async () => {
        try {
            setListaTamanhos(await getTamanhosAPI());
        } catch (err) {
            navigate("/login", { replace: true });
        }
    }

    const remover = async (codigo) => {
        if (window.confirm('Deseja remover este objeto?')) {
            try {
                let retornoAPI = await deleteSorvetePorCodigoAPI(codigo);
                setAlerta({ status: retornoAPI.status, message: retornoAPI.message })
                recuperaSorvetes();
            } catch (err) {
                // tratamento para ir para a tela de login em caso de erro
                navigate("/login", { replace: true });
            }
        }


    }

    useEffect(() => {
        recuperaSorvetes();
        recuperaTamanhos();
    }, []);



    return (
        <SorveteContext.Provider value={
            {
                listaObjetos, alerta, remover, objeto, editarObjeto,
                acaoCadastrar, handleChange, novoObjeto, exibirForm, setExibirForm, listaTamanhos
            }
        }>
            <Carregando carregando={carregando}>
                <Tabela />
            </Carregando>
            <Formulario />
        </SorveteContext.Provider>
    );
}
// antes de exportar o WithAuth é chamado
export default WithAuth(Sorvete);
//export default Sorvete;
