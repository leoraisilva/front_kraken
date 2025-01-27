import "./carousel.css"

function Carousel({image1, image2, image3}) {
    return (
        <>
        <div id="carouselExample" className="carousel slide container-carousel">
          <div className="carousel-inner">
          <div className="carousel-item active">
            <img src={image1}  className="bd-placeholder-img bd-placeholder-img-lg d-block w-100 img-car" alt="Promoção" />
          </div>
            <div className="carousel-item active">
            <img src={image2}  className="bd-placeholder-img bd-placeholder-img-lg d-block w-100 img-car" alt="Promoção" />
            </div>
            <div className="carousel-item">
            <img src={image3}  className="bd-placeholder-img bd-placeholder-img-lg d-block w-100 img-car" alt="Promoção" />
            </div>
          </div>
          <button className="carousel-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
    
        </>
    )
}

export default Carousel;