import { getToken } from '../Seguranca/Auth';

export const getTamanhosAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tamanho`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
                //"authorization": getToken()
            }
        })
    const data = await response.json()
    return data;
}

export const getTamanhoPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tamanho/${codigo}`,
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

export const cadastraTamanhoAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tamanho`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
            "authorization": getToken() 
            },
        body: JSON.stringify(objeto),
    })
    const data = await response.json();
    return data;
}

export const atualizarTamanhoAPI = async (tamanho) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tamanho`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(tamanho)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar tamanho');

    return data;
};


export const deleteTamanhoPorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/tamanho/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao remover tamanho');
    return data;
}

export default { getTamanhosAPI, getTamanhoPorCodigoAPI, 
    atualizarTamanhoAPI, cadastraTamanhoAPI, deleteTamanhoPorCodigoAPI };

//, atualizarLivro,