import Accordion from "../body/menu/Accordion";
import Carousel from "../body/menu/Carousel";
import Catalog from "../body/menu/Catalog";
import image1 from "/carousel/promocao.png";
import image2 from "/carousel/Qual-a-diferença-entre-oferta-promoção-saldão-desconto-e-liquidação.jpg"
import image3 from "/carousel/gettyimages-1185222353.jpg"

function Menu() {
    return (
        <>
            <Carousel image1={image1} image2={image2} image3={image3} />
            <Catalog />
            <Accordion />
        </>
    )
}

export default Menu;