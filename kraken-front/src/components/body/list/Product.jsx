import { Link } from "react-router-dom";
import "../body.css";

function Product({image, produto, valor, url}) {
    return (
        <>
        <div>
            <Link to={url} className="card container-product lista-produto">
                <img className="bd-placeholder-img card-img-top" src={image}/>
                <div className="card-body">
                    <h5 className="card-title">{produto}</h5>
                    <p className="card-text">{valor}</p>
                </div>
            </Link>
        </div>
        </>
    )
}

export default Product;