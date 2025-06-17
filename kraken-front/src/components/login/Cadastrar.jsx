import "./login.css";
import { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

function Cadastrar () {
    const navigate = useNavigate();
    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [tell, setTell] = useState('');
    const [cep, setCep] = useState('');
    const [tipo, setTipo] = useState('');
    const [address, setAddress] = useState({});
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


    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataAtualizacao = new Date();
        if (!usuario || !senha || !nome || !email || !cep ) {
            setError("Todos os campos são obrigatórios.");
            return;
        }

        const client = {
            usuario: usuario,
            senha: senha,
            nome: nome,
            email: email,
            tell: tell,
            cep: cep,
            data: dataAtualizacao.toISOString(),
            rules: tipo
        }
        try {
            const response = await fetch(`http://localhost:8080/cliente`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(client)
            })
            if(!response.ok){
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            const result = await response.json()
            const acesso = {
                usuarioId : result.idCliente,
                usuario : result.usuario,
                rules: result.rules
            }
            try {
                const resp = await fetch(`http://localhost:8080/cliente/auth/registry`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(acesso)
                })
            } catch (error) {
                setError('Error 403: Problema ao cadastrar!!');
            }
        }
        catch (error){
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde');
        }
        navigate ('/');
    }

    return (
        <>
            <div className="container-setting">
            <h2>Cadastrar Conta</h2>
            <form class="row g-3" onSubmit={handleSubmit}>
                <div class="col-md-6">
                    <label for="inputEmail4" class="form-label" >Usuário</label>
                    <input type="text" class="form-control" value={usuario} onChange={(e) => setUsuario(e.target.value)} required />
                </div>
                <div class="col-md-6">
                    <label for="inputPassword4" class="form-label">Senha</label>
                    <input type={show ? 'text' : 'password'} class="form-control"  onChange={(e) => setSenha(e.target.value)}  required />
                    <p className="btn-hide" h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Hide' : 'Show'}
                    </p>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome Completo</label>
                    <input type="text" class="form-control" onChange={(e) => setNome(e.target.value)} required />
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Email</label>
                    <input type="email" class="form-control" onChange={(e) => setEmail(e.target.value)} placeholder="examplo@kraken.com" required />
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
                    <input type="text" class="form-control" value={cep} onChange={(e) => setCep(e.target.value)} required />
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
                <div class="form-check">
                    <input type="radio" class="form-check-input" id="validationFormCheck2" name="tipo" value="USER" checked= {tipo == "USER"} onChange={(e) => setTipo(e.target.value)} required />
                    <label class="form-check-label" for="validationFormCheck2">Comprador</label>
                </div>
                <div class="form-check mb-3">
                    <input type="radio" class="form-check-input" id="validationFormCheck3" name="tipo" value="ADMIN" checked= {tipo == "ADMIN"} onChange={(e) => setTipo(e.target.value)} required />
                    <label class="form-check-label" for="validationFormCheck3">Vendedor</label>
                </div>
                <div class="col-6">
                    <button type="submit" class="btn btn-primary">Cadastrar</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Cadastrar;