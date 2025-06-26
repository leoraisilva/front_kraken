import { useEffect, useState } from "react";
import { authFetch } from "../../login/AuthFetch";
import { useNavigate, Link } from 'react-router-dom';
import "../body.css";

function Register () {
    const [categ, setCateg] = useState([]);
    const [error, setError] = useState('');
    const [store, setStore] = useState([]);
    const id_cliente = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [nomeProduto, setNomeProduto] = useState('');
    const [descricao, setDescricao] = useState('');
    const [categoriaId, setCategoriaId] = useState('');
    const [valorUnitario, setValorUnitario] = useState('');
    const [estoqueid, setEstoqueid] = useState('');
    const [quantidadeProduto, setQuantidadeProduto] = useState('');
    const [image, setImage] = useState(null);
    
    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const data = await authFetch(`http://localhost:8083/categoria`);
                setCateg(data);
            } catch (error) {
                console.error("erro ao carregar page", error);
                setError("Erro na leitura dos dados");
            }
        };

        fetchCategorias();
    }, []);

    useEffect(() => {
        const fetchEstoque = async () => {
            try {
                const data = await authFetch(`http://localhost:8082/estoque`);
                setStore(data);
            } catch (error) {
                console.error("Erro ao iniciar os dados", error);
                setError("Erro na leitura dos dados");
            }
        };

        fetchEstoque();
    }, []);

    const handleProductRegister = async (k) => {
        k.preventDefault();

        if (!nomeProduto || !descricao || !categoriaId || !valorUnitario || !estoqueid || !quantidadeProduto || !image) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        const formData = new FormData();
        formData.append('nomeProduto', nomeProduto);
        formData.append('descricao', descricao);
        formData.append('valorUnitario', valorUnitario);
        formData.append('categoriaId', categoriaId);
        formData.append('estoqueId', estoqueid);
        formData.append('clienteId', id_cliente);
        formData.append('quantidadeProduto', quantidadeProduto);
        formData.append('image', image);

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token JWT não encontrado');

            const response = await fetch(`http://localhost:8081/produto`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}` 
                },
                body: formData
            });

            if (!response.ok) throw new Error(`Erro na requisição ${response.status}`);

            const result = await response.json();
            navigate('/kraken/');
        } catch (error) {
            setError('Erro no cadastro');
            console.error(error);
        }
    };

    return (
        <>
        <div className="container-setting">
            <h2>Cadastrar Produto</h2>
            <form className="row g-3" onSubmit={handleProductRegister}>
                <div className="col-12">
                    <label className="form-label">Nome do Produto</label>
                    <input type="text" className="form-control" onChange={(e) => setNomeProduto(e.target.value)} required />
                </div>
                <div className="mb-3">
                    <label className="form-label">Descrição do Produto</label>
                    <textarea className="form-control" onChange={(e) => setDescricao(e.target.value)} rows="3" required></textarea>
                </div>
                <div className="mb-3">
                    <label className="form-label">Imagem</label>
                    <input className="form-control" type="file" onChange={(e) => setImage(e.target.files[0])} required />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Valor Unitário</label>
                    <input type="text" className="form-control" onChange={(e) => setValorUnitario(e.target.value)} required />
                </div>
                <div className="col-md-12">
                    <label className="form-label">Categoria</label>
                        <select className="form-select" aria-label="Default select example" value={categoriaId} onChange={(e) => setCategoriaId(e.target.value)} required >
                            <option selected>Seleciona a Categoria</option>
                            {categ.map((item, index)=>(
                                <option value={item.categoriaId} key={index}>{item.titulo}</option>
                            ))}
                        </select>
                </div>
                <div className="col-md-12">
                    <p><Link to="/kraken/registro-categoria" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Registrar a Categoria</Link></p>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Estoque</label>
                    <select className="form-select" aria-label="Default select example" value={estoqueid} onChange={(e) => setEstoqueid(e.target.value)} required >
                        <option selected>Seleciona o Estoque</option>
                        {store.map((produto, index) => (
                            <option value={produto.estoqueid} key={index}>{produto.nomeEstoque}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-12">
                    <label className="form-label">Quantidade Registrado</label>
                    <input type="number" className="form-control" onChange={(e) => setQuantidadeProduto(e.target.value)} required />
                </div>
                <div className="col-md-12">
                    <p><Link to="/kraken/store" className="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Registrar Estoque</Link></p>
                </div>
                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register;