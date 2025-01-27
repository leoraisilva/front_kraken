import Category from "./Category";
import "./category.css";
import image1 from '../../../public/catalog/Leonardo_Phoenix_Illustrate_a_vibrant_and_organized_scene_show_0.jpg' 
import image2 from '../../../public/catalog/Leonardo_Phoenix_Create_a_vibrant_and_mouthwatering_image_that_2.jpg' 
import image3 from '../../../public/catalog/Leonardo_Phoenix_Create_an_image_that_showcases_a_harmonious_a_0.jpg' 
import image4 from '../../../public/catalog/Leonardo_Phoenix_A_warmly_lit_inviting_scene_depicting_a_skill_3.jpg' 

function Catalog() {
    return (
        <>
        <div className="container-catalog">
            <div className="catalog">
                <Category title="Produto de Limpeza" text="Produtos de limpezas imperdiveis com o melhores preço disponivel" image={image1} />
                <Category title="Produto Alimenticio" text="Produto Alimenticio imperdiveis com o melhores preço disponivel" image={image2} />
                <Category title="Eletrodomestico" text="Eletrodomestico imperdiveis com o melhores preço disponivel" image={image3} />
                <Category title="Produto de serviço" text="Produto de serviço imperdiveis com o melhores preço disponivel" image={image4} />
            </div>
        </div>
        </>
    )
}

export default Catalog;