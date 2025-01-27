import "./category.css";

function Category ({image, title, text}) {
    return (
        <>
        <div className="card category">
            <img className="bd-placeholder-img card-img-top" src={image}/>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">{text}</p>
                <a href="#" className="btn btn-primary">Ir ver</a>
            </div>
        </div>
        </>
    )
}

export default Category;