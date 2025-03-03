import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../body.css";

function RegisterCategory() {
    const [titulo, setTitulo] = useState('');
    const [imagem, setImagem] = useState(null); 
    const [descricao, setDescricao] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('titulo', titulo);
        formData.append('imagem', imagem);
        formData.append('descricao', descricao);

        try {
            const response = await fetch(`http://localhost:8083/categoria`, {
                method: 'POST',
                body: formData, 
            });

            if (!response.ok) {
                throw new Error(`Erro na requisição ${response.status}`);
            }

            const result = await response.json();
            console.log('Categoria cadastrada com sucesso:', result);
            navigate('/kraken/'); 
        } catch (error) {
            setError('Erro no cadastro da Categoria');
            console.error(error);
        }
    };

    return (
        <>
            <div className="container-setting">
                <h2>Cadastro Categoria</h2>
                {error && <p className="error-message">{error}</p>}
                <form className="row g-3" onSubmit={handleRegister}>
                    <div className="col-12">
                        <label htmlFor="inputAddress" className="form-label">Título Categoria</label>
                        <input type="text" className="form-control" onChange={(e) => setTitulo(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formFileMultiple" className="form-label">Imagem</label>
                        <input className="form-control" type="file" onChange={(e) => setImagem(e.target.files[0])} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Descrição da Categoria</label>
                        <textarea className="form-control" onChange={(e) => setDescricao(e.target.value)} rows="3" required ></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Cadastrar</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default RegisterCategory;