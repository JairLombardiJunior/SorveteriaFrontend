import { getToken } from '../Seguranca/Auth';

export const getSorvetesAPI = async () => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/sorvete`,
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

export const getSorvetePorCodigoAPI = async (codigo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/sorvete/${codigo}`,
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

export const cadastraSorveteAPI = async (objeto, metodo) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/sorvete`, {
        method: metodo,
            headers: { "Content-Type": "application/json", 
                "authorization": getToken() },
        body: JSON.stringify(objeto)
    })
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar leitura');

    return data;
}

export const atualizarSorveteAPI = async (sorvete) => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/sorvete`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json", "authorization": getToken() },
            body: JSON.stringify(sorvete)
        })

    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao atualizar leitura');

    return data;
};


export const deleteSorvetePorCodigoAPI = async codigo => {
    const response = await fetch(`${process.env.REACT_APP_ENDERECO_API}/sorvete/${codigo}`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            "authorization": getToken()
            }
        });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Erro ao criar leitura');

    return data;
}



export default { getSorvetesAPI, getSorvetePorCodigoAPI, cadastraSorveteAPI, atualizarSorveteAPI, deleteSorvetePorCodigoAPI }