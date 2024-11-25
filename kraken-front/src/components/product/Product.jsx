import { GoPackageDependents } from "react-icons/go";
import { Itens } from "../../assets/Product"
import "../product/product.css"
import { useState } from "react";

function Product ({valor}) {
    const [Product, setProduct] = useState(Itens)
    const filteredProducts = Product.filter(item => item.categoria === valor);
    return (
        <>
            <div className="container-product">
                <h1>Produto</h1>
                <div className="content-product">
                {filteredProducts.map((item) => (
                    <div className="product" key={item.id}>
                        <div className="product-img">
                            <img src={item.image} />
                        </div>
                            <div className="product-text">
                                <h2>{item.produto} <GoPackageDependents className="addProduct" /></h2>
                                <h3>R$ {item.valor}</h3>
                                <h4>{item.descricao}</h4>
                            </div>
                    </div>
                    )
                )}
                </div>
            </div>
        </>
    )
}

export default Product;