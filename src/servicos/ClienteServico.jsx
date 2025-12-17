import { getToken } from '../Seguranca/Auth';

export const getClientesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        })
    const data = await response.json()
    return data;
}

export const getClientePorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente/${codigo}`,
        {
            
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        });
    const data = await response.json();
    return data;
}

export const cadastraClienteAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`, {
        method: metodo,
        headers: {
            "Content-Type": "application/json",
            "authorization": getToken() 
        },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}


export const atualizaClienteAPI = async (cliente) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(cliente)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar usuário');

    return data;
};

export const deleteClientePorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/cliente/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover usuário');
    return data;
}



export default { getClientesAPI, getClientePorCodigoAPI, 
    cadastraClienteAPI, atualizaClienteAPI, deleteClientePorCodigoAPI };