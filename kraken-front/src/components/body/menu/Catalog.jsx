import Category from "./Category";
import "../category.css";
import { useEffect } from "react";
import { useState } from "react";

function Catalog() {
    const [categ, setCateg] = useState([])
    const [error, setError] = useState('')
    useEffect(() =>{
        fetch(`http://localhost:8083/categoria`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => {
            if(!res.ok)
                throw new Error("Erro na requisição")
            return res.json();
        })
        .then(data => {
            setCateg(data);
        })
        .catch(error => {
            console.error("erro ao carregar os dados", error);
            setError("Erro no carregamento, tente novamente mais tarde")
        })
    }, [])

    return (
        <>
        {console.log(categ)}
        <div className="container-catalog">
            {categ.map((item, index)=>(
                <div className="catalog" key={index}>
                <Category title={item.titulo} text={item.descricao} image={`data:image/png;base64, ${item.imagem}`} url={`/kraken/list#${item.categoriaId}`} />
           </div>
            ))}
            
        </div>
        </>
    )
}

export default Catalog;