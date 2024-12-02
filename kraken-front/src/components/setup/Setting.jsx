import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';
import './cadastrar.css'

function Setting () {

    const id_cliente = localStorage.getItem('userId');
    const [modal, setModal] = useState (null)
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [tell, setTell] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({})
    const [error, setError] = useState(null);


    useEffect(() => {
        fetch(`https://viacep.com.br/ws/${cep}/json/`, {
            method: 'GET',
            mode: 'cors'
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Falha ao buscar dados do CEP');
                }
                return res.json();
            })
            .then(data => {
                setAddress(data); 
            })
            .catch(error => {
                console.error('Erro ao carregar dados de endereço:', error);
                setError('Erro ao carregar dados, tente novamente.');
            });
    });

    useEffect(() => {
        if (id_cliente) {
            fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                method: 'GET',
                mode: 'cors'
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Falha ao buscar dados do cliente');
                }
                return res.json();
            })
            .then(data => {
                setUser(data);
                setUsuario(data.usuario || '');
                setNome(data.nome || '');
                setSenha(data.senha || '');
                setEmail(data.email || '');
                setTell(data.tell || '');
                setCep(data.cep || '');
            })
            .catch(error => {
                console.error('Erro ao carregar dados do cliente:', error);
                setError('Erro ao carregar dados, tente novamente.');
            });
        } else {
            setError('ID do cliente não encontrado. Faça login novamente.');
        }
    }, [id_cliente]); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataHora = new Date();
    
        const cliente_alterado = {
            usuario: usuario,
            nome: nome,
            senha: senha,
            email: email,
            tell: tell,
            cep: cep,
            dataCadastro: dataHora.toISOString()
        }
        
        try {
            const response = await fetch(`http://localhost:8080/cliente/${id_cliente}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente_alterado)
            })

            if (!response.ok) { 
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const result = await response.json();

        }catch (error) {
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde.')
        }
        navigate('/kraken/')
    }


    const handleDelet = async (f) => {
        f.preventDefault();
        
        try {
            const response = await fetch(`http://localhost:8080/cliente/${id_cliente}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if (!response.ok) { 
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const result = await response.json();

        }catch (error) {
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde.')
        }
        navigate('/')
    }

    return (
        <>
        <div className="setting-container">
            <h1>Setting:</h1>
            <div className="setup-container">
                <form onSubmit={handleSubmit}>
                    <div className="setup-content">
                        <h2>Usuario:</h2>
                        <input type="text" id="usuario" value={usuario || user.usuario} onChange={(e) => setUsuario(e.target.value)} disabled />
                        <h2>Nome:</h2>
                        <input type="text" id="nome" value={nome || user.nome} onChange={(e) => setNome(e.target.value)} />
                        <h2>Senha:</h2>
                        <input type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} />

                        <div className="address-setup">
                            <h3>Endereço:</h3>
                            <div className="address-components">
                                <h2>Cep:</h2>
                                <input type="text" id="cep" value={cep || user.cep} onChange={(e) => setCep(e.target.value)}  />
                            </div>
                            <div className="address-components">
                                <h2>Pais:</h2>
                                <input type="text" value={cep !== '' ? 'Brasil' : ''} />
                            </div>
                            <div className="address-components">
                                <h2>Cidade:</h2>
                                <input type="text" value={cep !== '' ? address?.localidade  : ''} />
                            </div>
                            <div className="address-components">
                                <h2>Estado:</h2>
                                <input type="text" value={cep !== '' ? address?.estado  : ''} />
                                <h2>UF:</h2>
                                <input type="text" value={cep !== '' ? address?.uf : ''} />
                            </div>
                            <div className="address-components">
                                <h2>Rua:</h2>
                                <input type="text" value={cep !== '' ? address?.logradouro : ''} />
                            </div>
                            <div className="address-components">
                                <h2>Bairro:</h2>
                                <input type="text" value={cep !== '' ? address?.bairro : ''} />
                            </div>
                            <div className="address-components">
                                <h2>Número:</h2>
                                <input type="text" />
                            </div>
                        </div>

                        <h2>E-mail:</h2>
                        <input type="text" id="email" value={email || user.email} onChange={(e) => setEmail(e.target.value)} />
                        <h2>Tell:</h2>
                        <input type="text" id="tell" value={tell || user.tell} onChange={(e) => setTell(e.target.value)} />
                        <div className="bnt-setting">
                            <button type="submit" className="setting-btn">Confirmar</button>
                            <a className="bnt-delete" onClick={() => setModal("modal")} >Delete</a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div className={modal ? "modal" : ""} onClick={() => setModal(null)} ></div>
        <div className={modal ? "modal-container" : "modal-hide"}>
            <form onSubmit={handleDelet}>
                <div className='modal-content'>
                    <h1>Deletar!</h1>
                    <h2>Deseja deletar essa conta?</h2>
                    <div className='btn-confirm'>
                        <button type='submit' className="setting-btn">Sim</button>
                        <a className="bnt-delete" onClick={() => setModal(null)}>Não</a>
                    </div>
                </div>
            </form>
        </div>
    </>
);
}


export default Setting;