import "./category.css";
import { useState, useEffect } from 'react';
import { Link, useNavigate  } from 'react-router-dom';

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
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);

    useEffect(() => {
        if (id_cliente) {
            fetch(`http://localhost:8080/cliente/${id_cliente}`, {
                method: 'GET',
                mode: 'cors'
            })
            .then(res =>{
                if(!res.ok) {
                    throw new Error('Falha na busca de dados');
                }
                return res.json();
            })
            .then(data => {
                setUser(data.usuario || '');
                setSenha(data.senha || '');
                setNome(data.nome || '');
                setEmail(data.email || '');
                setCep(data.cep || '');
                setTell(data.tell || '');
            })
            .catch (error => {
                console.error('Erro ao carregar os dados', error);
                setError('Erro tente novamente mais tarde');
            });
        }
        else {
            setError('Id nao Localizado');
        }
    }, [id_cliente]);


    return (
        <>
        <div className="container-setting">
            <h2>Configuração</h2>
            <form class="row g-3">
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label">Usuário</label>
                    <input type="text" class="form-control" value={user} disabled/>
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Senha</label>
                    <input type={show ? 'text' : 'password'} class="form-control"  value={senha} />
                    <p className="btn-hide" h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </p>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" value={nome} />
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Email</label>
                    <input type="email" class="form-control" value={email} placeholder="examplo@kraken.com" />
                </div>
                <div class="col-10">
                    <label for="inputAddress2" class="form-label">Endereço</label>
                    <input type="text" class="form-control" id="inputAddress2" placeholder="Rua, Av., Apartamento" />
                </div>
                <div class="col-2">
                    <label for="inputAddress2" class="form-label">Numero</label>
                    <input type="text" class="form-control" id="inputAddress2"  />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Cidade</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-2">
                    <label for="inputState" class="form-label">Estado</label>
                    <input type="text" class="form-control" id="inputZip"/>
                </div>
                <div class="col-md-4">
                    <label for="inputZip" class="form-label">CEP</label>
                    <input type="text" class="form-control" value={cep} />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Pais</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-1">
                    <label for="inputState" class="form-label">DDD</label>
                    <input type="text" class="form-control" id="inputZip"/>
                </div>
                <div class="col-md-5">
                    <label for="inputZip" class="form-label">Tell</label>
                    <input type="text" class="form-control" value={tell} />
                </div>
                <div class="col-12">
                    <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="gridCheck" />
                    <label class="form-check-label" for="gridCheck">
                        Check me out
                    </label>
                    </div>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Setting;