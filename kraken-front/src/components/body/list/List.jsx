import "../body.css";
import { useEffect, useState } from "react";
import Product from "./Product";

function List () {
    const [categ, setCateg] = useState([]);
    const [produto, setProduto] = useState([])
    const [error, setError] = useState('');

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

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const data = await authFetch('http://localhost:8081/produto', {
                    method: 'GET',
                    mode: 'cors',
                });
                setProduto(data);
            } catch (error) {
                console.error("erro ao carregar os dados", error);
                setError("Erro no carregamento, tente novamente mais tarde");
            }
        };

        fetchProduto();
    }, []);

    return (
        <>
            <div className="container-list">
                <div className="row content-list">
                    <div className="col-4 list-product">
                        <div id="list-example" className="list-group">
                        {categ.map((item) => (
                            <a className="list-group-item list-group-item-action" href={`#${item.categoriaId}`}>{item.titulo}</a>
                        ))}
                        </div>
                    </div>
                    <div className="col-8 list-content">
                        <div data-bs-spy="scroll" data-bs-target="#list-example" data-bs-smooth-scroll="true" className="scrollspy-example list-content" >
                        {categ.map((item) => (
                                <div key={item.categoriaId} className="object-content">
                                    <h4 id={item.categoriaId}>{item.titulo}</h4>
                                    <div className="value-product" >
                                        {produto.filter((obj) => obj.categoriaId === item.categoriaId).map((obj) => (
                                            <div key={obj.produtoId}>
                                                <Product url={`/kraken/produto/${obj.produtoId}`} image={`data:image/png;base64,${obj.image}`} produto={obj.nomeProduto} valor={'R$ '+obj.valorUnitario.toFixed(2)} />
                                            </div>
                                        ))}
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