import "../body.css";
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function Setting () {

    const id_cliente = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [tell, setTell] = useState('');
    const [cep, setCep] = useState('');
    const [address, setAddress] = useState({})
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    useEffect(() => {
        if (cep) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`, {
                method: 'GET',
                mode: 'cors'
            })
            .then(res=>{
                if(!res.ok) {
                    throw new Error('Falha na busca de dados');
                }
                return res.json();
            })
            .then(data => {
                setAddress(data);
            })
            .catch(error => {
                console.error('Erro ao carregar dados de endereço:', error);
                setError('Erro tente novamente mais tarde');
            })
        }
    });

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

                    setUsuario(data.usuario || '');
                    setSenha(data.senha || '');
                    setNome(data.nome || '');
                    setEmail(data.email || '');
                    setCep(data.cep || '');
                    setTell(data.tell || '');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataAtualizacao = new Date();

        const client = {
            usuario: usuario,
            senha: senha,
            nome: nome,
            email: email,
            tell: tell,
            cep: cep,
            data: dataAtualizacao.toISOString()
        };

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            const response = await fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(client)
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const result = await response.json();
            navigate('/kraken/');
        } catch (error) {
            console.error("Erro ao atualizar cliente:", error);
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde');
        }
    };

    const handleDelet = async (f) => {
        f.preventDefault();

        try {
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Token não encontrado');

            const response = await fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const result = await response.json();
        }
        catch (error) {
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde');
            console.error(error);
        }
        navigate('/');
    }

    return (
        <>
        <div className="container-setting">
            <h2>Configuração</h2>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Usuário</label>
                    <input type="text" class="form-control" value={usuario} disabled/>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Senha</label>
                    <input type={show ? 'text' : 'password'} class="form-control"  value={senha} onChange={(e) => setSenha(e.target.value)} />
                    <p className="btn-hide" h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </p>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" value={nome} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Email</label>
                    <input type="email" class="form-control" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="examplo@kraken.com" />
                </div>
                <div class="col-10">
                    <label for="inputAddress2" class="form-label">Endereço</label>
                    <input type="text" class="form-control" placeholder="Rua, Av., Apartamento" value={address.logradouro} />
                </div>
                <div class="col-2">
                    <label for="inputAddress2" class="form-label">Numero</label>
                    <input type="text" class="form-control"  />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Cidade</label>
                    <input type="text" class="form-control" value={address.localidade} />
                </div>
                <div class="col-md-2">
                    <label for="inputState" class="form-label">Estado</label>
                    <input type="text" class="form-control" value={address.estado}/>
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">CEP</label>
                    <input type="text" class="form-control" value={cep} onChange={(e) => setCep(e.target.value)} />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Bairro</label>
                    <input type="text" class="form-control" value={address.bairro} />
                </div>
                <div class="col-md-1">
                    <label for="inputState" class="form-label">DDD</label>
                    <input type="text" class="form-control" value={address.ddd}/>
                </div>
                <div class="col-md-5">
                    <label for="inputZip" class="form-label">Tell</label>
                    <input type="text" class="form-control" value={tell} onChange={(e) => setTell(e.target.value)} />
                    <br/>
                </div>
                <div class="col-6">
                    <button type="submit" class="btn btn-primary">Editar</button>
                </div>
                <div class="col-6">
                    <button type="button" class="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>
                    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <form onSubmit={handleDelet}>
                            <div class="modal-dialog">
                                <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="exampleModalLabel">Deletar</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <p>Deseja Deletar a conta?</p>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Não</button>
                                    <button type="button" class="btn btn-primary">Sim</button>
                                </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </form>
        </div>
        </>
    )
}

export default Setting;