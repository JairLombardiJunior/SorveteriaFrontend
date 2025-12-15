import { getToken } from '../Seguranca/Auth';

export const getPedidosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            //"authorization": getToken()
            }
        })
    const data = await response.json()
    return data;
}

export const getPedidosPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            //"authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraPedidosAPI = async (pedidos) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`,
        {
            method: "POST",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(pedidos)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar pedido');

    return data;
};

/*
export const cadastraPedidosAPI = async (objeto, metodo) => {
    const url = metodo === "PUT" 
        ? `${process.env.REACT_APP_ENDERECO_API}/pedidos/${objeto.codigo}`
        : `${process.env.REACT_APP_ENDERECO_API}/pedidos`;
    
    const response = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}*/

export const atualizarPedidosAPI = async (pedidos) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(pedidos)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar pedidos');

    return data;
};


export const deletePedidosPorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/pedidos/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}



export default { getPedidosAPI, getPedidosPorCodigoAPI, cadastraPedidosAPI, atualizarPedidosAPI, deletePedidosPorCodigoAPI };