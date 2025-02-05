import "../category.css";
import { useEffect, useState } from "react";
import Product from "./Product";

function List () {
    const [categ, setCateg] = useState([]);
    const [productCateg, setProductCateg] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8081/categoria`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res=>{
            if(!res.ok)
                throw new Error("Erro ao inicializar");
            return res.json()
        })
        .then(data => {
            setCateg(data)
        })
        .catch(error=>{
            console.error("Erro na inicialização dos dados", error);
            setError("Erro no Sistema, tente mais tarde");
        })
    })

    return (
        <>
            <div className="container-list">
                <div class="row content-list">
                    <div class="col-4 list-product">
                        <div id="list-example" class="list-group">
                        {categ.map((item, index) => (
                            <a class="list-group-item list-group-item-action" href={"#"+item.categoriaId}>{item.titulo}</a>
                        ))}
                        </div>
                    </div>
                    <div class="col-8 list-content">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" class="scrollspy-example list-content" tabindex="0">
                            {categ.map((item, index) => (
                            <div key={index}>
                                <h4 id={item.categoriaId}>{item.titulo}</h4>
                                <div className="value-product">
                                    <Product />
                                    <Product />
                                    <Product />
                                    <Product />
                                </div>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default List;