import { useState } from 'react';
import "../body.css";
import { useNavigate } from 'react-router-dom';

function Store (){
    const [nome, setNome] = useState('')
    const [minimo, setMinimo] = useState(0)
    const [maximo, setMaximo] = useState(0)
    const [quantidade, setQuantidade] = useState(0)
    const [descricao, setDescricao] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const handleStore = async (h) => {
    h.preventDefault();

    const store = {
        nomeEstoque: nome,
        valorMinimo: minimo,
        valorMaximo: maximo,
        quantidadeProduto: quantidade,
        descricao: descricao
    };

    try {
        const result = await authFetch(`http://localhost:8082/estoque`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(store)
        });
    } catch (error) {
        setError("Erro ao cadastrar");
        console.error(error);
    }
    navigate('/kraken/');
};


    return (
        <>
        <div className="container-setting">
            <h2>Cadastro Estoque</h2>
            <form className="row g-3" onSubmit={handleStore}>
                <div className="col-12">
                    <label className="form-label">Nome do Estoque</label>
                    <input type="text" className="form-control" onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Valor mínimo</label>
                    <input type="number" className="form-control" onChange={(e) => setMinimo(e.target.value)} />
                </div>
                <div className="col-md-6">
                    <label className="form-label">Valor máximo</label>
                    <input type="number" className="form-control" onChange={(e) => setMaximo(e.target.value)}/>
                </div>
                <div className="col-12">
                    <label className="form-label">Quantidade Maxima de item</label>
                    <input type="number" className="form-control" onChange={(e) => setQuantidade(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição do Estoque</label>
                    <textarea className="form-control" onChange={(e) => setDescricao(e.target.value)} rows="3"></textarea>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Store;