import { useEffect, useState } from "react";
import "../category.css";
import { data, Link } from 'react-router-dom';

function Register () {
    const [categ, setCateg] = useState([])
    const [error, setError] = useState('')
    
    useEffect(()=> {
        fetch(`http://localhost:8081/categoria`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => {
            if(!res.ok)
                throw new Error("erro ao inicializar");
            return res.json()
        })
        .then(data=>{
            setCateg(data);
        })
        .catch(error=>{
            console.error("erro ao carregar page", error);
            setError("Erro na leitura dos dados");
        })
    })


    return (
        <>
        <div className="container-setting">
            <h2>Cadastrar</h2>
            <form class="row g-3">
                
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Nome do Produto</label>
                    <input type="text" class="form-control" id="inputAddress" />
                </div>
                <div class="mb-3">
                    <label for="exampleFormControlTextarea1" class="form-label">Descrição do Produto</label>
                    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>
                <div class="mb-3">
                    <label for="formFileMultiple" class="form-label">Imagem</label>
                    <input class="form-control" type="file" id="formFileMultiple" multiple />
                </div>
                <div class="col-md-6">
                    <label for="inputCity" class="form-label">Valor Unitário</label>
                    <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="col-md-6">
                    <label for="inputZip" class="form-label">Unidade Utilizada</label>
                    <input type="text" class="form-control" id="inputZip"/>
                </div>
                <div class="col-md-12">
                    <label for="inputCity" class="form-label">Categoria</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Seleciona a Categoria</option>
                            {categ.map((item, index)=>(
                                <option key={index}>{item.titulo}</option>
                            ))}
                        </select>
                </div>
                <div class="col-md-12">
                    <p><Link to="/kraken/registro-categoria" class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Registrar a Categoria</Link></p>
                </div>
                <div class="col-md-12">
                    <label for="inputCity" class="form-label">Estoque</label>
                    <select class="form-select" aria-label="Default select example">
                        <option selected>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </select>
                </div>
                <div class="col-md-12">
                    <label for="inputMax" class="form-label">Quantidade Registrado</label>
                    <input type="number" class="form-control" id="inputMax" />
                </div>
                <div class="col-md-12">
                    <p><Link to="/kraken/store" class="link-dark link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover">Registrar Estoque</Link></p>
                </div>
                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Sign in</button>
                </div>
            </form>
        </div>
        </>
    )
}

export default Register;