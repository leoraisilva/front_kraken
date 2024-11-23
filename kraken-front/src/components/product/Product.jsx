import { GoPackageDependents } from "react-icons/go";
import "../product/product.css"

function Product () {
    return (
        <>
            <div className="container-product">
                <h1>Produto</h1>
                <div className="content-product">
                    <div className="product">
                        <div className="product-img">
                            <img src="https://static.todamateria.com.br/upload/ab/ac/abacate-cke.jpg" />
                        </div>
                        <div className="product-text">
                            <h2>Product <GoPackageDependents className="addProduct" /></h2>
                            <h3>R$ ##,##</h3>
                            <h4>Descricao do produto</h4>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product;