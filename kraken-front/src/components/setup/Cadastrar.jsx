import './cadastrar.css'

function Cadastrar () {
    return (
        <>
            <div className='setting-container'>
                <h1>Setting:</h1>
                <div className='setup-container'>
                    <div className='setup-content'>
                        <h2>Usuario:</h2>
                        <input type='text'  />
                        <h2>Nome:</h2>
                        <input type='text' />
                        <h2>Senha:</h2>
                        <input type='text' />
                        
                        <div className='address-setup'>
                            <h3>Endereço:</h3>
                            <div className='address-components'>
                                <h2>Cep:</h2>
                                <input type='text'  />
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
                        <input type='text'/>
                        <h2>Tell:</h2>
                        <input type='text' />
                        <button className='setting-btn'>Confirmar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cadastrar;