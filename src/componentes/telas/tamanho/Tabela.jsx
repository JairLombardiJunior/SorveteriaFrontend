import { useContext } from 'react'
import TamanhoContext from './TamanhoContext';
import Alerta from '../../comuns/Alerta';
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap';
import { getUsuario } from '../../../Seguranca/Auth.jsx';
import SorveteContext from '../../telas/sorvete/SorveteContext';


function Tabela() {
    // Capturar as ações do contexto:
    const { alerta, listaObjetos, remover, novoObjeto, editarObjeto } = useContext(SorveteContext);

    let usuario = null;
    try { 
        usuario = getUsuario(); 
    }
    catch (error) 
    { 
        usuario = null; 
    }
    
    const isAdmin = usuario && usuario.tipo === 'admin';

    return (
        <div style={{ padding: '20px' }}>
            <h1>Tamanhos</h1>
            <Alerta alerta={alerta} />
            <Button variant="primary" onClick={() => novoObjeto()}>
                Novo <i className="bi bi-file-earmark-plus"></i>
            </Button>
            {listaObjetos.length === 0 && <h1>Nenhum Tamanho encontrada</h1>}
            {listaObjetos.length > 0 && (

                <Table striped bordered hover responsive>
                    <thead>
                        <tr>
                            <th style={{
                                textAlign: 'center'
                            }}>Ações</th>
                            <th>Código</th>
                            <th>Nome</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaObjetos.map((objeto) => (
                            <tr key={objeto.codigo}>
                                <td align="center">

                                    <Button variant="info" onClick={() => editarObjeto(objeto.codigo)}>
                                        <i className="bi bi-pencil-square"></i>
                                    </Button>
                                    <Button variant="danger" onClick={() => { remover(objeto.codigo); }}>
                                        <i className="bi bi-trash"></i>
                                    </Button>
                                    
                                </td>
                                <td>{objeto.codigo}</td>
                                <td>{objeto.nome}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default Tabela;