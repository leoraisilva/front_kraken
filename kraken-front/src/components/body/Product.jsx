function Product({image, produto, valor}) {
    return (
        <>
        <div>
            <div className="card container-product">
                <img className="bd-placeholder-img card-img-top" src={image}/>
                <div className="card-body">
                    <h5 className="card-title">{produto}</h5>
                    <p className="card-text">{valor}</p>
                </div>
            </div>
        </div>
        </>
    )
}

export default Product;