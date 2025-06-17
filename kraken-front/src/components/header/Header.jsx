import { useState, useEffect } from "react";
import "./header.css"
import { Link } from 'react-router-dom';

function Header() {
    const id_cliente = localStorage.getItem('userId');
    const [cliente, setCliente] = useState({});
    

    useEffect(() => {
            if (id_cliente) {
                const fetchCliente = async () => {
                    try {
                        const token = localStorage.getItem('token');
                        if (!token) throw new Error('Token JWT não encontrado');
    
                        const res = await fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                            method: 'GET',
                            mode: 'cors',
                            headers: {
                                'Authorization': `Bearer ${token}`,
                                'Content-Type': 'application/json'
                            }
                        });
    
                        if (!res.ok) {
                            throw new Error('Falha na busca de dados');
                        }
    
                        const data = await res.json();
                        setCliente(data);

                    } catch (error) {
                        console.error('Erro ao carregar os dados', error);
                        setError('Erro tente novamente mais tarde');
                    }
                };
    
                fetchCliente();
            } else {
                setError('Id não localizado');
            }
        }, [id_cliente]);

    return (
        <>
            <nav className=" container-header navbar navbar-expand-lg bg-body-tertiary ">
            <div className="container-fluid ">
                <Link to="/kraken/" className="navbar-brand">Kraken</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link to="/kraken/list" className="nav-link">Categoria</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/kraken/setting" className="nav-link">Configuração</Link>
                    </li>
                    <li className="nav-item">
                        {cliente.rules == 'ADMIN' ? <Link to="/kraken/register" className="nav-link">Cadastrar Produto</Link> : <Link to="/kraken/checking" className="nav-link">Checking</Link>}
                    </li>
                    <li className="nav-item">
                        {cliente.rules == 'ADMIN' ? <Link to="/kraken/store" className="nav-link">Registrar Estoque</Link> : <Link to="/kraken/historic" className="nav-link">Historico</Link>}
                    </li>
                    <li className="nav-item">
                        {cliente.rules == 'ADMIN' ? <Link to="/kraken/registro-categoria" className="nav-link">Registrar Categoria</Link> : <></>}
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link">Sair</Link>
                    </li>
                </ul>
                <form className="d-flex" role="search">
                    <input className="form-control me-2" type="search" placeholder="Buscar" aria-label="Search" />
                    <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
                </div>
            </div>
            </nav>
        </>
    )
}

export default Header;