import Category from "./Category";
import "../body.css";
import { authFetch } from "../../login/AuthFetch";
import { useEffect } from "react";
import { useState } from "react";

function Catalog() {
    const [categ, setCateg] = useState([])
    const [error, setError] = useState('')
    
    useEffect(() => {
        const fetchCategoria = async () => {
            try {
                const data = await authFetch('http://localhost:8083/categoria', {
                    method: 'GET',
                    mode: 'cors',
                });
                setCateg(data);
            } catch (error) {
                console.error("erro ao carregar os dados", error);
                setError("Erro no carregamento, tente novamente mais tarde");
            }
        };

        fetchCategoria();
    }, []);

    return (
        <>
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