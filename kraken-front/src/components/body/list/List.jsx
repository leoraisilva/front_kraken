import "../category.css";
import { useEffect, useState } from "react";
import Product from "./Product";

function List () {
    const [categ, setCateg] = useState([]);
    const [produto, setProduto] = useState([])
    const [error, setError] = useState('');

    useEffect(() => {
        fetch(`http://localhost:8083/categoria`, {
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
        .catch(error => {
            console.error("erro ao carregar os dados", error);
            setError("Erro no carregamento, tente novamente mais tarde")
        })
    }, []);

    useEffect(() => {
        fetch(`http://localhost:8081/produto`, {
            method: 'GET',
            mode: 'cors'
        })
        .then(res => {
            if(!res.ok)
                throw new Error("Erro no carregamento dos dados");
            return res.json();
        })
        .then(data => {
            setProduto(data);
        })
        .catch(error => {
            console.error("erro ao carregar os dados", error);
            setError("Erro no carregamento, tente novamente mais tarde")
        })
    }, []);

    return (
        <>
            <div className="container-list">
                <div className="row content-list">
                    <div className="col-4 list-product">
                        <div id="list-example" className="list-group">
                        {categ.map((item, index) => (
                            <a className="list-group-item list-group-item-action" href={"#"+item.categoriaId}>{item.titulo}</a>
                        ))}
                        </div>
                    </div>
                    <div className="col-8 list-content">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example list-content" >
                        {categ.map((item) => (
                                <div key={item.categoriaId} className="object-content">
                                    <h4 id={item.categoriaId}>{item.titulo}</h4>
                                    {produto.filter((obj) => obj.categoriaId === item.categoriaId).map((obj) => (
                                        <div className="value-product" key={obj.produtoId}>
                                            <Product image={'data:image/png;base64,' + obj.image} produto={obj.nomeProduto} valor={'R$ '+obj.valorUnitario.toFixed(2)} />
                                        </div>
                                    ))}
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