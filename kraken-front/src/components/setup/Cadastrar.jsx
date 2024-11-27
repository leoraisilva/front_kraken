import { useState } from 'react';
import './cadastrar.css'

function Cadastrar () {

    const [usuario, setUsuario] = useState('');
    const [nome, setNome] = useState('');
    const [senha, setSenha] = useState('');
    const [email, setEmail] = useState('');
    const [tell, setTell] = useState('');
    const [cep, setCep] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataHora = new Date();
    
        const cliente = {
            usuario: usuario,
            nome: nome,
            senha: senha,
            email: email,
            tell: tell,
            cep: cep,
            dataCadastro: dataHora.toISOString()
        }

        try {
            const response = await fetch('http://localhost:8080/cliente',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(cliente)
            })

            if (!response.ok) { 
                throw new Error(`Erro na requisição: ${response.status}`);
            }

            const result = await response.json();
            
            setUsuario('');
            setNome('');
            setSenha('');
            setEmail('');
            setTell('');
            setCep('');

        }catch (error) {
            setError('Error 403: Problema ao cadastrar. Tente novamente mais tarde.')
        }
    }


    return (
        <>
            <div className='setting-container'>
                <h1>Setting:</h1>
                <div className='setup-container'>
                    <form onSubmit={handleSubmit} >
                        <div className='setup-content'> 
                            <h2>Usuario:</h2>
                            <input type='text' id='usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                            <h2>Nome:</h2>
                            <input type='text' id='nome' value={nome} onChange={(e) => setNome(e.target.value)} />
                            <h2>Senha:</h2>
                            <input type='password' id='senha' value={senha} onChange={(e) => setSenha(e.target.value)} />
                            
                            <div className='address-setup'>
                                <h3>Endereço:</h3>
                                <div className='address-components'>
                                    <h2>Cep:</h2>
                                    <input type='text' id='cep' value={cep} onChange={(e) => setCep(e.target.value)} />
                                </div>
                                <div className='address-components'>
                                    <h2>Pais:</h2>
                                    <input type='text' />
                                </div>
                                <div className='address-components'>
                                    <h2>Cidade:</h2>
                                    <input type='text'  />
                                </div>
                                <div className='address-components'>
                                    <h2>Estado:</h2>
                                    <input type='text' />
                                    <h2>UF:</h2>
                                    <input type='text'  />
                                </div>
                                <div className='address-components'>
                                    <h2>Rua:</h2>
                                    <input type='text' />
                                </div>
                                <div className='address-components'>
                                    <h2>Bairro:</h2>
                                    <input type='text'/>
                                </div>
                                <div className='address-components'>
                                    <h2>Número:</h2>
                                    <input type='text'/>
                                </div>
                            </div>

                            <h2>E-mail:</h2>
                            <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                            <h2>Tell:</h2>
                            <input type='text' id='tell' value={tell} onChange={(e) => setTell(e.target.value)} />
                            <button type='submit' className='setting-btn' >Confirmar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Cadastrar;