import { useContext } from 'react'
import Alerta from '../../comuns/Alerta';
import SorveteContext from './SorveteContext';
import Col from 'react-bootstrap/Col';
import CampoEntrada from '../../comuns/CampoEntrada';
import Dialogo from '../../comuns/Dialogo';
import CampoSelect from '../../comuns/CampoSelect';
import CampoEntradaTextArea from '../../comuns/CampoEntradaTextArea';

function Formulario() {

    const { objeto, handleChange, acaoCadastrar, alerta, exibirForm, setExibirForm, listaTamanhos } = useContext(SorveteContext);
    console.log("Tamanho nome teste"); 
    console.log(listaTamanhos);
    return (
        <Dialogo id="modalEdicao" titulo="Sorvete"
            idform="formulario" acaoCadastrar={acaoCadastrar}
            exibirForm={exibirForm} setExibirForm={setExibirForm}>
            <Alerta alerta={alerta} />
            <Col xs={12} md={4}>
                <CampoEntrada value={objeto.codigo}
                    id="txtCodido" name="codigo" label="Código"
                    tipo="number" onchange={handleChange}
                    readonly={true}
                    maxCaracteres={5} />
            </Col>
            <Col xs={12} md={8}>
                <CampoEntrada value={objeto.sabor}
                    id="txtSabor" name="sabor" label="Sabor"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o sabor"
                    requerido={true} readonly={false}
                    maxCaracteres={40} />
            </Col>
            <Col xs={12} md={12}>
                <CampoEntradaTextArea value={objeto.descricao}
                    id="txtDescricao" name="descricao" label="Desrição"
                    tipo="text" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a descrição"
                    requerido={false} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.quantidade_estoque}
                    id="txtEstoque" name="quantidade_estoque" label="Estoque"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a quantidade em estoque"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.valor}
                    id="txtValor" name="valor" label="Valor"
                    tipo="number" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe o valor"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoEntrada value={objeto.data_cadastro}
                    id="txtDataCadastro" name="data_cadastro" label="Data de cadastro"
                    tipo="date" onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a data de cadastro"
                    requerido={true} readonly={false} />
            </Col>
            <Col xs={12} md={6}>
                <CampoSelect value={objeto.ativo}
                    id="txtAtivo" name="ativo" label="Ativo"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe se está ativo"
                    requerido={true}>
                    <option value={true}>Sim</option>
                    <option value={false}>Não</option>
                </CampoSelect>
            </Col>
            <Col xs={12} md={12}>
                <CampoSelect value={objeto.tamanho}
                    id="txtTamanho" name="tamanho" label="Tamanho"
                    onchange={handleChange}
                    msgvalido="OK certo" msginvalido="Informe a tamanho"
                    requerido={true}>
                    {listaTamanhos.map((tam) => (
                        <option key={tam.codigo} value={tam.codigo}>
                            {tam.nome}
                        </option>
                    ))}
                </CampoSelect>
            </Col>
        </Dialogo>
    )
}

export default Formulario;