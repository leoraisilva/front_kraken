import "../body.css";
import { Link } from 'react-router-dom';

function Category ({image, title, text, url}) {
    return (
        <>
        <div className="card category">
            <img className="bd-placeholder-img card-img-top" src={image}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <Link to={url} className="btn btn-primary" >Ir Ver</Link>
            </div>
        </div>
        </>
    )
}

export default Category;